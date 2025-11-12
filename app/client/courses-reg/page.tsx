'use client'

import { useState } from 'react'
import Link from 'next/link'

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
  prerequisites?: string[]
}

export default function CoursesRegPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const availableCourses: Course[] = [
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
      id: '3',
      code: 'CS301',
      name: 'Cơ sở dữ liệu',
      credits: 3,
      instructor: 'PGS. Lê Văn C',
      schedule: 'Thứ 2, 6 (13:30-15:30)',
      room: 'P301',
      capacity: 30,
      enrolled: 28,
      status: 'available',
      prerequisites: ['CS201']
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
      status: 'available',
      prerequisites: ['CS301']
    }
  ]

  const filteredCourses = availableCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const handleRegister = () => {
    if (selectedCourses.length === 0) {
      alert('Vui lòng chọn ít nhất một môn học để đăng ký')
      return
    }
    setShowConfirmModal(true)
  }

  const confirmRegister = () => {
    // Here you would typically send the registration to your API
    alert(`Đăng ký thành công ${selectedCourses.length} môn học!`)
    setSelectedCourses([])
    setShowConfirmModal(false)
  }

  const getTotalCredits = () => {
    return selectedCourses.reduce((total, courseId) => {
      const course = availableCourses.find(c => c.id === courseId)
      return total + (course?.credits || 0)
    }, 0)
  }

  const getSelectedCourses = () => {
    return availableCourses.filter(course => selectedCourses.includes(course.id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Đăng ký môn học</h1>
          <p className="text-gray-600">Chọn các môn học bạn muốn đăng ký cho học kỳ này</p>
        </div>
        <div className="flex space-x-2">
          <Link
            href="/client/courses-list"
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Xem tất cả môn học
          </Link>
          <button
            onClick={handleRegister}
            disabled={selectedCourses.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Đăng ký ({selectedCourses.length})
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Tìm kiếm môn học
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
        </div>
      </div>

      {/* Course Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Courses */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Môn học khả dụng</h2>
          
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  id={`course-${course.id}`}
                  checked={selectedCourses.includes(course.id)}
                  onChange={() => handleCourseToggle(course.id)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <label htmlFor={`course-${course.id}`} className="cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
                        <p className="text-sm text-gray-500">{course.code} • {course.credits} tín chỉ</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                        Còn {course.capacity - course.enrolled} chỗ
                      </span>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Giảng viên:</span> {course.instructor}
                      </div>
                      <div>
                        <span className="font-medium">Lịch học:</span> {course.schedule}
                      </div>
                      <div>
                        <span className="font-medium">Phòng:</span> {course.room}
                      </div>
                    </div>

                    {course.prerequisites && (
                      <div className="mt-2">
                        <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                          Yêu cầu: {course.prerequisites.join(', ')}
                        </span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy môn học</h3>
              <p className="mt-1 text-sm text-gray-500">Thử thay đổi từ khóa tìm kiếm</p>
            </div>
          )}
        </div>

        {/* Selected Courses Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Môn học đã chọn</h2>
            
            {selectedCourses.length === 0 ? (
              <p className="text-gray-500 text-sm">Chưa chọn môn học nào</p>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {getSelectedCourses().map((course) => (
                    <div key={course.id} className="flex justify-between items-start p-3 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium text-sm">{course.name}</div>
                        <div className="text-xs text-gray-500">{course.code}</div>
                      </div>
                      <button
                        onClick={() => handleCourseToggle(course.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Tổng tín chỉ:</span>
                    <span className="font-semibold">{getTotalCredits()}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Số môn học:</span>
                    <span className="font-semibold">{selectedCourses.length}</span>
                  </div>
                </div>

                <button
                  onClick={handleRegister}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Đăng ký tất cả
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Xác nhận đăng ký</h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn đăng ký {selectedCourses.length} môn học với tổng {getTotalCredits()} tín chỉ?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={confirmRegister}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}