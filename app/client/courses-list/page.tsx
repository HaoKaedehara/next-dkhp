'use client'

import { useState } from 'react'

interface Course {
  id: string
  code: string
  name: string
  credits: number
  instructor: string
  schedule: string
  room: string
  capacity: number
  enrolled: number
  status: 'available' | 'full' | 'closed'
}

export default function CoursesListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const courses: Course[] = [
    {
      id: '1',
      code: 'CS101',
      name: 'Lập trình căn bản',
      credits: 3,
      instructor: 'TS. Nguyễn Văn A',
      schedule: 'Thứ 2, 4 (7:30-9:30)',
      room: 'P201',
      capacity: 40,
      enrolled: 35,
      status: 'available'
    },
    {
      id: '2',
      code: 'CS201',
      name: 'Lập trình hướng đối tượng',
      credits: 3,
      instructor: 'TS. Trần Thị B',
      schedule: 'Thứ 3, 5 (9:30-11:30)',
      room: 'P202',
      capacity: 35,
      enrolled: 35,
      status: 'full'
    },
    {
      id: '3',
      code: 'CS301',
      name: 'Cơ sở dữ liệu',
      credits: 3,
      instructor: 'PGS. Lê Văn C',
      schedule: 'Thứ 2, 6 (13:30-15:30)',
      room: 'P301',
      capacity: 30,
      enrolled: 28,
      status: 'available'
    },
    {
      id: '4',
      code: 'CS401',
      name: 'Mạng máy tính',
      credits: 3,
      instructor: 'TS. Phạm Thị D',
      schedule: 'Thứ 4, 7 (15:30-17:30)',
      room: 'P401',
      capacity: 25,
      enrolled: 20,
      status: 'available'
    },
    {
      id: '5',
      code: 'CS501',
      name: 'Trí tuệ nhân tạo',
      credits: 3,
      instructor: 'PGS. Hoàng Văn E',
      schedule: 'Thứ 3, 6 (7:30-9:30)',
      room: 'P501',
      capacity: 30,
      enrolled: 25,
      status: 'closed'
    }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (selectedFilter === 'all') return matchesSearch
    if (selectedFilter === 'available') return matchesSearch && course.status === 'available'
    if (selectedFilter === 'full') return matchesSearch && course.status === 'full'
    if (selectedFilter === 'closed') return matchesSearch && course.status === 'closed'
    
    return matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'full': return 'bg-red-100 text-red-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Còn chỗ'
      case 'full': return 'Đầy'
      case 'closed': return 'Đã đóng'
      default: return 'Không xác định'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Danh sách môn học</h1>
          <p className="text-gray-600">Xem tất cả môn học khả dụng trong học kỳ</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Tìm kiếm
            </label>
            <input
              type="text"
              id="search"
              placeholder="Tìm theo tên môn học, mã môn, giảng viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="sm:w-48">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              id="filter"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả</option>
              <option value="available">Còn chỗ</option>
              <option value="full">Đầy</option>
              <option value="closed">Đã đóng</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Môn học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tín chỉ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giảng viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lịch học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phòng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sĩ số
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{course.name}</div>
                      <div className="text-sm text-gray-500">{course.code}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.instructor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.schedule}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.room}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.enrolled}/{course.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                      {getStatusText(course.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy môn học</h3>
            <p className="mt-1 text-sm text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Thống kê</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
            <div className="text-sm text-gray-500">Tổng số môn học</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {courses.filter(c => c.status === 'available').length}
            </div>
            <div className="text-sm text-gray-500">Còn chỗ</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {courses.filter(c => c.status === 'full').length}
            </div>
            <div className="text-sm text-gray-500">Đã đầy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {courses.filter(c => c.status === 'closed').length}
            </div>
            <div className="text-sm text-gray-500">Đã đóng</div>
          </div>
        </div>
      </div>
    </div>
  )
}