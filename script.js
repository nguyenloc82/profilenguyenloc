// Chờ cho toàn bộ nội dung HTML được tải xong rồi mới chạy code
document.addEventListener('DOMContentLoaded', function() {

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