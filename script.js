// Chờ cho toàn bộ nội dung HTML được tải xong rồi mới chạy code
document.addEventListener('DOMContentLoaded', function() {

   const carousel = document.querySelector('.project-carousel');
    const originalItems = carousel.querySelectorAll('.project-item'); 

    originalItems.forEach(item => {
        const clone = item.cloneNode(true); // Sao chép (clone) 1 item
        carousel.appendChild(clone); // Dán item đã sao chép vào cuối
    });
   // Lấy tất cả các carousel ảnh kinh nghiệm
const allExpCarousels = document.querySelectorAll('.exp-image-carousel');

allExpCarousels.forEach(carouselWrapper => {
    const track = carouselWrapper.querySelector('.exp-carousel-track');
    const images = track.querySelectorAll('img');
    const dotsContainer = carouselWrapper.querySelector('.exp-carousel-dots');
    let currentIndex = 0;
    let slideInterval; // Biến để lưu trữ ID của interval

    // Tạo các chấm chỉ báo
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('exp-dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            clearInterval(slideInterval); // Dừng auto-slide khi click chấm
            currentIndex = index;
            updateCarousel();
            startAutoSlide(); // Bắt đầu lại auto-slide sau khi click
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.exp-dot');

    // Hàm cập nhật vị trí carousel và trạng thái chấm
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Hàm tự động trượt ảnh
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        }, 3000); // Trượt sau mỗi 3 giây (3000ms)
    }

    // Bắt đầu tự động trượt khi tải trang
    startAutoSlide();

    // Dừng tự động trượt khi rê chuột vào carousel
    carouselWrapper.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Tiếp tục tự động trượt khi rê chuột ra khỏi carousel
    carouselWrapper.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
});
   
    // Lấy các phần tử (elements) cần thiết từ HTML
    const modalOverlay = document.getElementById('project-modal');
    const modalContent = document.querySelector('.modal-content');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalImage = document.getElementById('modal-image');

    // Lấy TẤT CẢ các item dự án (dưới dạng một danh sách)
    const projectItems = document.querySelectorAll('.project-item');

    // Hàm để mở Modal
    function openModal(title, description, imageSrc) {
        modalTitle.textContent = title;
        modalDescription.innerHTML = description;
        modalImage.src = imageSrc;
        modalOverlay.classList.remove('hidden'); // Hiển thị modal
    }

    // Hàm để đóng Modal
    function closeModal() {
        modalOverlay.classList.add('hidden'); // Ẩn modal
    }

    // Yêu cầu: Click vào dự án thì hiện thông tin
    // Chúng ta lặp qua từng item dự án và gán sự kiện 'click'
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            // Lấy thông tin từ các thuộc tính 'data-*' chúng ta đã gán trong HTML
            const title = item.dataset.title;
            const description = item.dataset.description;
            // Lấy đường dẫn ảnh từ thuộc tính data-image-src
            const imageSrc = item.dataset.imageSrc; 

            // Gọi hàm mở modal với thông tin vừa lấy được
            openModal(title, description, imageSrc);
        });
    });

    // Gán sự kiện 'click' cho nút "X" để đóng modal
    closeBtn.addEventListener('click', closeModal);

    // Gán sự kiện 'click' cho NỀN MỜ (overlay) để đóng modal
    // (Nếu click vào khoảng trống bên ngoài thì cũng đóng)
    modalOverlay.addEventListener('click', function(event) {
        // Chỉ đóng nếu click vào chính cái nền mờ (chứ không phải modal-content)
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

});
