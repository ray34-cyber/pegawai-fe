# README.md - Frontend Next.js Aplikasi Manajemen Tugas dan Remunerasi

## 1. Arsitektur Solusi Frontend

### Alur Data Frontend

- Frontend menggunakan Next.js (App Router) sebagai framework React modern dengan rendering Server dan Client Components.
- API dipanggil dengan `axios` ke backend Laravel yang menyediakan data task, employee, dan remunerasi.
- State management menggunakan React Context untuk manajemen state global tugas dan employee.
- Komponen UI modular dan reusable, dipisah antara komponen presentasi (UI) dan container (logic).
- Routing menggunakan folder-based routing bawaan Next.js.
- Validasi form dilakukan di frontend sebelum submit ke backend untuk UX lebih baik.

---

## 2. Penjelasan Desain Frontend

- **React Context & Hooks** untuk state management agar mudah di-maintain dan menghindari prop drilling.
- **Modular folder structure** memisahkan components, context, hooks, utils, dan types agar kode lebih bersih dan scalable.
- **UI components** dipisah agar bisa digunakan ulang di berbagai halaman (misal Button, Input, Textarea).
- **Responsive design** menggunakan Tailwind CSS agar UI optimal di berbagai perangkat (mobile, tablet, desktop).
- Form validasi dan error handling untuk memastikan data input user valid sebelum dikirim ke backend.
- Interaksi dengan backend mengutamakan async/await dan error handling agar UX lebih mulus.

---

## 3. Setup & Deploy

### Prasyarat

- Node.js = v20.15.0
- npm atau yarn

### Instalasi

1. Clone repository frontend:

   ```bash
   git clone <repository-url>
   cd project-frontend

   ```

2. Install dependencies:
   ```bash
   npm install

   # atau

   yarn install

3. Konfigurasi environment

      Buat file .env.local di root folder dan tambahkan konfigurasi backend API URL, misalnya:

   ```env
   NEXT_PUBLIC_API_URL=

4. Jalankan development server:

   ```bash
   npm run dev

   # atau

   yarn dev

5. Buka browser dan akses:

   ```bash
   http://localhost:3000

## 4. Tantangan & Solusi

### Tantangan

- Mengelola state global yang kompleks terkait task dan employee tanpa menggunakan library eksternal seperti Redux.

- Menjaga struktur folder tetap modular dan scalable untuk proyek yang akan berkembang.

- Menangani validasi form yang cukup kompleks (input jam kerja, tarif, biaya ekstra) dengan UX yang baik.

- Integrasi dengan backend yang memiliki aturan bisnis khusus, misalnya perhitungan remunerasi dan relasi data.

- Membuat UI responsif yang bekerja baik di perangkat mobile dan desktop.

### Solusi

- Menggunakan React Context dan custom hooks untuk state management yang ringan dan mudah di-maintain.

- Memecah komponen UI menjadi reusable components dengan naming dan struktur yang konsisten.

- Membuat validasi form dengan custom hooks dan reducer untuk pengelolaan error state yang terpusat.

- Membuat service layer (taskService.ts, employeeService.ts, employeeTaskService.ts ) yang bertugas komunikasi dengan backend agar kode lebih terstruktur.

- Menggunakan CSS modular dan utility classes untuk membuat UI yang responsif dan konsisten.
