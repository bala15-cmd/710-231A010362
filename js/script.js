document.addEventListener('DOMContentLoaded', () => {
    
    // --- PHẦN 1: BÀI TẬP 01 - TÌM KIẾM SẢN PHẨM ---
    const grid = document.getElementById('productGrid');
    const search = document.getElementById('searchInput');
    if (grid && search) {
        // Mảng sản phẩm chi tiết thêm thuộc tính image, category, desc
        const products = [
    { 
        id: 1, name: "iPhone 17 Pro Max", price: "36.990.000đ", 
        image: "images/iPhone 17 Pro Max.webp", 
        category: "Điện thoại", desc: "Chip A19 Pro (2nm), RAM 12GB, màn hình ProMotion 144Hz."
    },
    { 
        id: 2, name: "iPad Pro M5 (2026)", price: "32.490.000đ", 
        image: "images/iPad Pro M5 (2026).webp", 
        category: "Máy tính bảng", desc: "Chip M5 siêu phân luồng, thiết kế không viền hoàn toàn."
    },
    { 
        id: 3, name: "Samsung Galaxy S25 Ultra", price: "33.990.000đ", 
        image: "images/Samsung Galaxy S25 Ultra.webp", 
        category: "Điện thoại", desc: "Camera 300MP, pin Graphene sạc siêu nhanh 15 phút."
    },
    { 
        id: 4, name: "Macbook Pro M5 Max", price: "55.990.000đ", 
        image: "images/iPad Pro M5 (2026).webp", 
        category: "Laptop", desc: "Cấu trúc Neural Engine thế hệ 6, xử lý AI cục bộ cực mạnh."
    },
    { 
        id: 5, name: "Apple Vision Pro 2", price: "85.000.000đ", 
        image: "images/Apple Vision Pro 2.jpg", 
        category: "Kính VR", desc: "Trọng lượng siêu nhẹ, độ phân giải 8K mỗi mắt."
    },
    { 
        id: 6, name: "AirPods Pro 3", price: "6.990.000đ", 
        image: "images/AirPods Pro 3.webp", 
        category: "Phụ kiện", desc: "Cảm biến đo nhịp tim và nhiệt độ cơ thể qua tai."
    }
];

        // Hàm hiển thị sản phẩm với giao diện chi tiết
        const display = (list) => {
            grid.innerHTML = list.map(p => `
                <div class="card">
                    <span class="badge">${p.category}</span>
                    <img src="${p.image}" alt="${p.name}" class="product-img">
                    <h3>${p.name}</h3>
                    <p class="desc">${p.desc}</p>
                    <p class="price">${p.price}</p>
                    <button class="buy-btn">Mua ngay</button>
                </div>
            `).join('');
            document.getElementById('errorMsg').style.display = list.length ? 'none' : 'block';
        };

        search.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            const filtered = products.filter(p => p.name.toLowerCase().includes(val));
            display(filtered);
        });

        display(products); // Gọi lần đầu để hiện danh sách
    }
    // --- PHẦN 2: BÀI TẬP 02 - VALIDATE & LOCAL STORAGE ---
    const regForm = document.getElementById('regForm');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pass = document.getElementById('pass').value;
            const terms = document.getElementById('terms').checked;
            
            // Regex: 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số
            const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (!passRegex.test(pass)) {
                alert("Mật khẩu phải tối thiểu 8 ký tự, gồm chữ HOA, chữ thường và số!");
                return;
            }
            if (!terms) {
                alert("Bạn phải đồng ý với điều khoản!");
                return;
            }

            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value
            };
            localStorage.setItem('userData', JSON.stringify(data));
            alert("Đăng ký thành công! Dữ liệu đã được lưu.");
            regForm.reset();
        });
    }

    // --- PHẦN 3: BÀI TẬP 03 - COUNTDOWN TIMER ---
    const timerBox = document.getElementById('timer');
    if (timerBox) {
        let timeLeft = 600; // 10 phút = 600 giây
        
        const clock = setInterval(() => {
            let mins = Math.floor(timeLeft / 60);
            let secs = timeLeft % 60;
            
            timerBox.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

            if (timeLeft < 60) {
                timerBox.classList.add('warning-blink');
            }

            if (timeLeft <= 0) {
                clearInterval(clock);
                alert("Hết giờ làm bài!");
            }
            timeLeft--;
        }, 1000);
    }
});