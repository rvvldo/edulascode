# Custom Dialog System - Usage Guide

## Overview
Sistem dialog custom yang cantik dan sesuai tema website untuk menggantikan `window.alert()` dan `window.confirm()`.

## Features
✅ **Beautiful UI** - Design modern dengan animasi smooth
✅ **Theme Aware** - Otomatis mengikuti tema (light/dark)
✅ **Type Safe** - Full TypeScript support
✅ **Easy to Use** - API sederhana seperti window.alert/confirm
✅ **Icons** - Icon yang sesuai dengan tipe dialog
✅ **Customizable** - Bisa custom title, message, button text

## Dialog Types

### 1. Confirm Dialog
Untuk konfirmasi user action (Ya/Tidak)

```typescript
import { useDialogStore } from "@/hooks/useDialog";

const { confirm } = useDialogStore();

// Basic usage
const confirmed = await confirm("Apakah Anda yakin?");
if (confirmed) {
  // User clicked "Ya"
} else {
  // User clicked "Tidak"
}

// With custom title
const confirmed = await confirm(
  "Apakah Anda yakin ingin menghapus foto profil?",
  "Hapus Foto Profil"
);
```

### 2. Alert Dialog (Info)
Untuk informasi umum

```typescript
import { useDialogStore } from "@/hooks/useDialog";

const { alert } = useDialogStore();

// Basic info alert
await alert("Data berhasil disimpan!");

// With custom title
await alert(
  "Profil Anda telah diperbarui",
  "Berhasil"
);
```

### 3. Success Alert
Untuk notifikasi sukses

```typescript
const { alert } = useDialogStore();

await alert(
  "Foto profil berhasil diupload!",
  "Berhasil",
  "success"
);
```

### 4. Error Alert
Untuk notifikasi error

```typescript
const { alert } = useDialogStore();

await alert(
  "Terjadi kesalahan saat menyimpan data",
  "Error",
  "error"
);
```

## Complete Example

```typescript
import { useDialogStore } from "@/hooks/useDialog";

const MyComponent = () => {
  const { confirm, alert } = useDialogStore();

  const handleDelete = async () => {
    // Show confirm dialog
    const confirmed = await confirm(
      "Data yang dihapus tidak dapat dikembalikan",
      "Hapus Data?"
    );

    if (confirmed) {
      try {
        // Delete logic here
        await deleteData();
        
        // Show success alert
        await alert(
          "Data berhasil dihapus",
          "Berhasil",
          "success"
        );
      } catch (error) {
        // Show error alert
        await alert(
          "Gagal menghapus data",
          "Error",
          "error"
        );
      }
    }
  };

  return (
    <button onClick={handleDelete}>
      Hapus Data
    </button>
  );
};
```

## Migration from window.confirm/alert

### Before (Old Way):
```typescript
// window.confirm
const confirmed = window.confirm("Apakah Anda yakin?");
if (confirmed) {
  // do something
}

// window.alert
window.alert("Data berhasil disimpan!");
```

### After (New Way):
```typescript
import { useDialogStore } from "@/hooks/useDialog";

const { confirm, alert } = useDialogStore();

// confirm
const confirmed = await confirm("Apakah Anda yakin?");
if (confirmed) {
  // do something
}

// alert
await alert("Data berhasil disimpan!");
```

## Advanced Usage

### Custom Button Text
```typescript
const { showDialog } = useDialogStore();

showDialog({
  type: 'confirm',
  title: 'Konfirmasi',
  message: 'Apakah Anda yakin?',
  confirmText: 'Lanjutkan',
  cancelText: 'Batalkan',
  onConfirm: () => {
    console.log('Confirmed');
  },
  onCancel: () => {
    console.log('Cancelled');
  },
});
```

## Dialog Icons

Each dialog type has its own icon:
- **confirm**: ⚠️ Warning icon (amber)
- **success**: ✅ Check circle (green)
- **error**: ❌ X circle (red)
- **info**: ℹ️ Info icon (blue)

## Styling

Dialog menggunakan Tailwind CSS dan mengikuti theme dari ThemeProvider:
- **Light mode**: Background putih, text hitam
- **Dark mode**: Background gelap, text putih
- **Rounded corners**: 3xl (24px)
- **Shadow**: 2xl untuk depth
- **Animation**: Smooth fade in/out dan zoom

## Best Practices

1. **Always use await** untuk confirm dan alert
   ```typescript
   // ✅ Good
   const confirmed = await confirm("Message");
   
   // ❌ Bad
   const confirmed = confirm("Message"); // Missing await
   ```

2. **Use appropriate dialog type**
   ```typescript
   // ✅ Good - Use confirm for destructive actions
   const confirmed = await confirm("Delete this item?");
   
   // ❌ Bad - Don't use alert for confirmations
   await alert("Delete this item?");
   ```

3. **Provide clear messages**
   ```typescript
   // ✅ Good - Clear and specific
   await confirm(
     "Foto yang dihapus tidak dapat dikembalikan",
     "Hapus Foto Profil?"
   );
   
   // ❌ Bad - Too vague
   await confirm("Are you sure?");
   ```

4. **Handle errors properly**
   ```typescript
   // ✅ Good
   try {
     await someAction();
     await alert("Success!", "Berhasil", "success");
   } catch (error) {
     await alert(error.message, "Error", "error");
   }
   ```

## Troubleshooting

### Dialog tidak muncul
- Pastikan `<DialogProvider />` sudah ditambahkan di `App.tsx`
- Cek console untuk error messages

### Dialog tidak menutup
- Pastikan menggunakan `await` pada confirm/alert
- Cek apakah ada error di onConfirm/onCancel callback

### Styling tidak sesuai
- Pastikan Tailwind CSS sudah dikonfigurasi dengan benar
- Cek apakah theme provider berfungsi

## Components Structure

```
src/
├── components/
│   ├── ui/
│   │   └── alert-dialog.tsx      # Radix UI wrapper
│   └── DialogProvider.tsx         # Main dialog component
├── hooks/
│   └── useDialog.tsx              # Dialog state management
└── App.tsx                        # DialogProvider integration
```

## Dependencies

- `@radix-ui/react-alert-dialog` - Base dialog component
- `zustand` - State management
- `lucide-react` - Icons
- `tailwindcss` - Styling

## Notes

- Dialog menggunakan Zustand untuk state management yang ringan
- Promise-based API untuk async/await support
- Fully accessible dengan keyboard navigation
- Mobile responsive
