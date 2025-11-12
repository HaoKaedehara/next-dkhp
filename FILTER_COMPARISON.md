# So sánh 2 loại Filter trong dự án

## 1️⃣ Filter trong ShareToolbar (Custom Filter Button)

### Vị trí
- Nằm trong `components/admin/ShareToolbar.tsx`
- Hiển thị như một button "Bộ lọc" trên toolbar

### Tính năng hiện tại
```tsx
// Filter Button
{showFilter && onFilter && (
    <Button
        variant="outlined"
        startIcon={<FilterIcon />}
        onClick={onFilter}
        sx={{ borderRadius: 2 }}
    >
        {filterLabel}
    </Button>
)}
```

### Đặc điểm
- ✅ **Custom UI**: Bạn tự thiết kế giao diện filter theo nhu cầu
- ✅ **Linh hoạt**: Có thể tạo filter phức tạp với nhiều field, date range, dropdown, autocomplete, v.v.
- ✅ **Business Logic**: Phù hợp cho filter nghiệp vụ phức tạp (ví dụ: lọc sinh viên theo khóa học đã đăng ký, trạng thái học phí, v.v.)
- ✅ **Tách biệt**: Không phụ thuộc vào cấu trúc columns của DataGrid
- ✅ **UX tốt hơn**: Có thể thiết kế dialog/drawer với grouping, tabs, reset buttons, v.v.
- ⚠️ **Cần implement**: Hiện tại chỉ có button, chưa có logic lọc và UI dialog
- ⚠️ **Quản lý state**: Phải tự quản lý filter state và apply vào data

### Ví dụ use case
```tsx
// Dialog filter phức tạp cho sinh viên
<FilterDialog>
  <Select label="Khoa" />
  <Select label="Khóa học" />
  <DateRangePicker label="Ngày nhập học" />
  <TextField label="GPA từ - đến" />
  <Autocomplete label="Giảng viên hướng dẫn" />
  <Checkbox label="Chỉ hiện sinh viên nợ học phí" />
</FilterDialog>
```

---

## 2️⃣ Filter built-in của MUI DataGrid

### Vị trí
- Tích hợp sẵn trong `@mui/x-data-grid`
- Hiển thị qua column menu hoặc toolbar filter panel

### Tính năng
- Lọc theo từng cột (column-based filtering)
- Filter operators theo kiểu dữ liệu:
  - **String**: contains, equals, starts with, ends with, is empty, is not empty
  - **Number**: =, !=, >, >=, <, <=, is empty, is not empty
  - **Date**: is, not, after, on or after, before, on or before, is empty, is not empty
  - **Boolean**: is
  - **singleSelect**: is, is any of

### Cách kích hoạt
Hiện tại trong `SharedDataGrid.tsx` **CHƯA** enable filter panel. Để bật:

```tsx
// Cách 1: Thêm slots toolbar với GridToolbar
import { GridToolbar } from '@mui/x-data-grid';

slots={{
    toolbar: GridToolbar, // Built-in toolbar với filter button
}}

// Cách 2: Chỉ hiển thị filter panel button
import { GridToolbarFilterButton } from '@mui/x-data-grid';

slots={{
    toolbar: () => (
        <Box>
            <GridToolbarFilterButton />
            {/* Các custom buttons khác */}
        </Box>
    ),
}}

// Cách 3: Control filterModel từ bên ngoài
<DataGrid
    filterModel={{
        items: [
            { field: 'masv', operator: 'contains', value: 'CT' },
            { field: 'gpa', operator: '>', value: '3.0' },
        ],
    }}
    onFilterModelChange={(model) => setFilterModel(model)}
/>
```

### Đặc điểm
- ✅ **Sẵn có**: Không cần code thêm, chỉ cần enable
- ✅ **Nhanh chóng**: Lọc tức thì (real-time) khi user nhập
- ✅ **Column-aware**: Tự động hiểu kiểu dữ liệu của cột
- ✅ **Server-side support**: Có thể dùng `filterModel` để gửi lên API
- ⚠️ **UI cố định**: Không tùy chỉnh nhiều (panel nhỏ, dạng form đơn giản)
- ⚠️ **Giới hạn**: 
  - Free version: chỉ 1 filter tại một thời điểm
  - Pro/Premium: multi-filters với AND/OR logic
- ⚠️ **Không phù hợp**: Filter nghiệp vụ phức tạp (relationships, nested data)

### Ví dụ sử dụng
```tsx
// Lọc sinh viên có mã chứa "CT" VÀ GPA > 3.0
const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [
        { field: 'masv', operator: 'contains', value: 'CT' },
        { field: 'gpa', operator: '>', value: '3.0' },
    ],
    logicOperator: GridLogicOperator.And, // Cần Pro plan
});

<DataGrid
    filterModel={filterModel}
    onFilterModelChange={setFilterModel}
/>
```

---

## 📊 Bảng so sánh trực quan

| Tiêu chí | Custom Filter (Toolbar) | DataGrid Built-in Filter |
|----------|-------------------------|--------------------------|
| **Độ phức tạp UI** | Cao - tùy chỉnh hoàn toàn | Thấp - panel cố định |
| **Thời gian implement** | Lâu - phải code UI + logic | Nhanh - chỉ enable prop |
| **Tính linh hoạt** | Rất cao | Trung bình |
| **Business logic** | Hỗ trợ tốt | Hạn chế |
| **UX cho user** | Tùy thuộc thiết kế | Đơn giản, quen thuộc |
| **Performance** | Tùy implementation | Tối ưu sẵn |
| **Multi-filter** | Tự implement | Free: ❌, Pro: ✅ |
| **Server-side** | Tự handle | Có filterModel |

---

## 🎯 Khuyến nghị sử dụng

### Dùng Custom Filter (Toolbar) khi:
- ✅ Cần filter theo nhiều tiêu chí phức tạp (date range, multi-select, v.v.)
- ✅ Filter liên quan đến relationships (sinh viên theo khóa học, giảng viên, v.v.)
- ✅ Cần UI/UX đặc biệt (wizard, steps, grouping)
- ✅ Filter có business rules phức tạp
- ✅ Muốn lưu filter presets (saved filters)

**Ví dụ**: "Lọc sinh viên khoa CNTT, khóa 2020-2024, đã hoàn thành ít nhất 100 tín chỉ, chưa đóng học phí kỳ 2"

### Dùng DataGrid Built-in Filter khi:
- ✅ Lọc đơn giản theo cột (tìm tên, email, mã số)
- ✅ Cần triển khai nhanh
- ✅ Filter theo từng field độc lập
- ✅ Không cần UI phức tạp

**Ví dụ**: "Tìm sinh viên có tên chứa 'Nguyễn'", "GPA > 3.5"

### Kết hợp cả hai:
Trong nhiều trường hợp, bạn có thể dùng **CẢ HAI**:
- **Search field** (Toolbar): Tìm kiếm nhanh theo nhiều field
- **Custom Filter** (Toolbar): Filter nghiệp vụ phức tạp
- **DataGrid Filter**: Quick filter theo cột cụ thể

---

## 💡 Giải pháp cho dự án hiện tại

### Option 1: Giữ nguyên Custom Filter
```tsx
// Implement filter dialog với các tiêu chí nghiệp vụ
const StudentFilterDialog = () => (
  <Dialog>
    <Select label="Khoa" options={departments} />
    <Select label="Khóa" options={years} />
    <TextField label="GPA từ" type="number" />
    <TextField label="GPA đến" type="number" />
    <Button>Áp dụng</Button>
  </Dialog>
);

// Trong student page:
onFilter={() => setOpenFilterDialog(true)}
```

### Option 2: Enable DataGrid Filter + giữ Custom Filter
```tsx
// Thêm vào SharedDataGrid
import { GridToolbarFilterButton } from '@mui/x-data-grid';

// Trong CustomToolbarWithSelection:
<Stack direction="row" spacing={1}>
    {/* Built-in filter */}
    <GridToolbarFilterButton />
    
    {/* Custom toolbar buttons */}
    <ShareToolbar {...toolbarConfig} />
</Stack>
```

### Option 3: Chỉ dùng DataGrid Filter (đơn giản nhất)
```tsx
// Xóa showFilter prop
// Enable GridToolbar hoặc GridToolbarFilterButton
slots={{
    toolbar: GridToolbar,
}}
```

---

## 🚀 Khuyến nghị cuối cùng

Với trang **Quản lý sinh viên** hiện tại:

1. **Giữ Search field** (đang có): Tìm nhanh theo mã/tên/email/v.v.
2. **Xóa Custom Filter button** hoặc implement dialog nếu cần filter phức tạp
3. **Enable DataGrid built-in filter** cho quick column filtering

**Code suggestion**:
```tsx
// Trong SharedDataGrid.tsx, thêm prop
enableColumnFilter?: boolean;

// Khi enableColumnFilter = true
import { GridToolbarFilterButton, GridToolbarColumnsButton } from '@mui/x-data-grid';

// Thêm vào toolbar
{enableColumnFilter && <GridToolbarFilterButton />}
```

Hiện tại bạn đã có:
- ✅ Search (global search)
- ✅ Column selection dialog
- ✅ Export button
- ✅ Bulk actions

Thiếu:
- ❓ Filter: Quyết định dùng custom hay built-in
- ❓ Sort: DataGrid đã có built-in sort (click column header)

---

**Kết luận**: Custom Filter và DataGrid Filter phục vụ 2 mục đích khác nhau. Trong hầu hết trường hợp quản lý đơn giản, **DataGrid built-in filter** là đủ. Chỉ cần Custom Filter khi có yêu cầu nghiệp vụ phức tạp.
