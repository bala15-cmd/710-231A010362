document.addEventListener('DOMContentLoaded', () => {
    
    // --- PHẦN 1: BÀI TẬP 01 - TÌM KIẾM SẢN PHẨM ---
    const grid = document.getElementById('productGrid');
    const search = document.getElementById('searchInput');
    if (grid && search) {
        const products = [
            { name: "iPhone 15 Pro", price: "28.000.000đ" },
            { name: "Samsung Galaxy S24", price: "22.500.000đ" },
            { name: "Macbook Pro M3", price: "40.000.000đ" },
            { name: "iPad Air 5", price: "14.500.000đ" },
            { name: "AirPods Pro 2", price: "5.500.000đ" }
        ];

        const display = (list) => {
            grid.innerHTML = list.map(p => `
                <div class="card">
                    <h3>${p.name}</h3>
                    <p style="color: #e67e22; font-weight: bold;">${p.price}</p>
                </div>
            `).join('');
            document.getElementById('errorMsg').style.display = list.length ? 'none' : 'block';
        };

        search.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            const filtered = products.filter(p => p.name.toLowerCase().includes(val));
            display(filtered);
        });

        display(products); // Khởi tạo ban đầu
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