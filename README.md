# Folder Structure

**/src**

- `/@types` : Untuk menampung file penambahan custom `property` atau custom `object` ke dalam interface (3rd Party Library).
- `/assets` : Untuk menampung file images dan styles (.scss / .css).
- `/components` : Untuk menampung file components, untuk component non-generic (yang hanya dipakai untuk menu tertentu) harus dibuatkan folder lagi sesuai dengan nama menu-nya, untuk component generic bisa langsung ditaruh di dalam folder `components`. Untuk file dialog / modal ditambahkan `Dialog` di belakangnya.
- `/composables` : Untuk menampung file composable, untuk composable non-generic (yang hanya dipakai untuk menu tertentu) harus dibuatkan folder lagi sesuai dengan nama menu-nya, untuk composable generic bisa langsung ditaruh di dalam folder `composables`.
- `/constants` : Untuk menampung file constants, penamaan enum dan file harus dalam bentuk jamak, contoh: `roles.constant.ts` (`Roles`).
- `/layouts` : Untuk menampung file layout yang digunakan untuk wireframe aplikasi.
- `/router` : Untuk menampung file yang berhubungan dengan routing.
- `/stores` : Untuk menampung file state management (pinia), untuk state management non-generic (yang hanya dipakai untuk menu tertentu) harus dibuatkan folder lagi sesuai dengan nama menu-nya, untuk state management generic bisa langsung ditaruh di dalam folder `stores`.
- `/types` : Untuk menampung file `interface` dan `type` yang dibutuhkan oleh application.
- `/utils` : Untuk menampung file yang fungsinya hanya sebagai helper / utility, contoh: file yang berisikan utility untuk generate dan check jwt token.
- `/views` : Untuk menampung file view yang digunakan pada `router`, file harus difolder sesuai dengan nama Parent Menunya.

**globals.d.ts**

Untuk file yang diregister sebagai global component, file harus diregister di dalam `components.d.ts` agar Intellisense Typescriptnya tetap jalan.

**/tests**

Sebagai penampung file unit test, struktur folder ini mengikuti struktur `/src` dan filename ditambahkan `.test.ts`

# Versioning

Untuk versioning harus ditambahkan ke dalam `CHANGELOG.md` dan version terakhir harus ter-refleksi ke dalam `package.json`.

Versioning menggunakan Semantic Versioning `MAJOR.MINOR.PATCH` dengan aturan sebagai berikut:

- `MAJOR` : Upgrade Framework (LTS)
- `MINOR` : Penambahan features
- `PATCH` : Untuk bug fixing, security vulnerability, tech debt

# Naming Case

- File Name (Typescript .ts): `camelCase`, contoh: `documentStatus.constant.ts`, `nav.store.ts`
- File Name (Vue .vue): `PascalCase`, contoh: `Dashboard.vue`, `Login.vue`
- Nama Class, Interface, Type, Constant: `PascalCase`, contoh: `LegalEntity`, `LegalEntityAttributes`
- Nama Function: `camelCase`, contoh: `getOptionsData`, `deleteData`
- Nama Composable dan State Management: `camelCase` dan harus diawali dengan kata `use`, contoh: `useLogin`, `useLegalEntity`

# Start New Project

1. Clone project ini
2. Clone project baru yang akan dibuat
3. Copy hasil isi clone dari project ini ke folder project baru (Exclude folder `.git`)
4. `CHANGELOG.md` dan `version` pada `package.json` direset menjadi `0.0.0` (Sebelum Go-Live version harus diupdate menjadi 1.0.0)
5. Ubah `# Template UI Changelog` pada `CHANGELOG.md` menjadi `# Nama Project Baru Changelog`
6. Ubah `name` pada `package.json` sesuai dengan nama project baru.
7. Ubah `title` pada `index.html` sesuai dengan nama project baru.
8. Additional: Ubah `favicon` pada `index.html` sesuai dengan logo yang ingin digunakan.
