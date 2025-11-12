'use client'

import { useState } from 'react'
import Link from 'next/link'

interface RegisteredCourse {
  id: string
  code: string
  name: string
  credits: number
  instructor: string
  schedule: string
  room: string
  registrationDate: string
  status: 'confirmed' | 'pending' | 'cancelled'
  paymentStatus: 'paid' | 'unpaid'
  fee: number
}

export default function CoursesAppPage() {
  const [filter, setFilter] = useState('all')

  const registeredCourses: RegisteredCourse[] = [
    {
      id: '1',
      code: 'CS101',
      name: 'Lập trình căn bản',
      credits: 3,
      instructor: 'TS. Nguyễn Văn A',
      schedule: 'Thứ 2, 4 (7:30-9:30)',
      room: 'P201',
      registrationDate: '2024-01-15',
      status: 'confirmed',
      paymentStatus: 'paid',
      fee: 2500000
    },
    {
      id: '2',
      code: 'CS201',
      name: 'Lập trình hướng đối tượng',
      credits: 3,
      instructor: 'TS. Trần Thị B',
      schedule: 'Thứ 3, 5 (9:30-11:30)',
      room: 'P202',
      registrationDate: '2024-01-16',
      status: 'confirmed',
      paymentStatus: 'unpaid',
      fee: 2500000
    },
    {
      id: '3',
      code: 'CS301',
      name: 'Cơ sở dữ liệu',
      credits: 3,
      instructor: 'PGS. Lê Văn C',
      schedule: 'Thứ 2, 6 (13:30-15:30)',
      room: 'P301',
      registrationDate: '2024-01-17',
      status: 'pending',
      paymentStatus: 'unpaid',
      fee: 2500000
    },
    {
      id: '4',
      code: 'CS401',
      name: 'Mạng máy tính',
      credits: 3,
      instructor: 'TS. Phạm Thị D',
      schedule: 'Thứ 4, 7 (15:30-17:30)',
      room: 'P401',
      registrationDate: '2024-01-18',
      status: 'confirmed',
      paymentStatus: 'unpaid',
      fee: 2500000
    }
  ]

  const filteredCourses = registeredCourses.filter(course => {
    if (filter === 'all') return true
    if (filter === 'confirmed') return course.status === 'confirmed'
    if (filter === 'pending') return course.status === 'pending'
    if (filter === 'unpaid') return course.paymentStatus === 'unpaid'
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Đã xác nhận'
      case 'pending': return 'Chờ xác nhận'
      case 'cancelled': return 'Đã hủy'
      default: return 'Không xác định'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'unpaid': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Đã thanh toán'
      case 'unpaid': return 'Chưa thanh toán'
      default: return 'Không xác định'
    }
  }

  const handleCancelCourse = (courseId: string) => {
    if (confirm('Bạn có chắc chắn muốn hủy đăng ký môn học này?')) {
      // Handle course cancellation
      alert('Hủy đăng ký thành công!')
    }
  }

  const totalCredits = registeredCourses.filter(c => c.status !== 'cancelled').reduce((sum, course) => sum + course.credits, 0)
  const totalFee = registeredCourses.filter(c => c.status !== 'cancelled').reduce((sum, course) => sum + course.fee, 0)
  const unpaidFee = registeredCourses.filter(c => c.paymentStatus === 'unpaid' && c.status !== 'cancelled').reduce((sum, course) => sum + course.fee, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Môn học đã đăng ký</h1>
          <p className="text-gray-600">Quản lý các môn học bạn đã đăng ký</p>
        </div>
        <div className="flex space-x-2">
          <Link
            href="/client/courses-reg"
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Đăng ký thêm môn học
          </Link>
          <Link
            href="/client/courses-pay"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Thanh toán học phí
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg text-white mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Môn học đã đăng ký</p>
              <p className="text-2xl font-bold text-gray-900">{registeredCourses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg text-white mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng tín chỉ</p>
              <p className="text-2xl font-bold text-gray-900">{totalCredits}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg text-white mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng học phí</p>
              <p className="text-2xl font-bold text-gray-900">{(totalFee / 1000000).toFixed(1)}M đ</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-red-500 p-3 rounded-lg text-white mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Chưa thanh toán</p>
              <p className="text-2xl font-bold text-gray-900">{(unpaidFee / 1000000).toFixed(1)}M đ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tất cả ({registeredCourses.length})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Đã xác nhận ({registeredCourses.filter(c => c.status === 'confirmed').length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'pending' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Chờ xác nhận ({registeredCourses.filter(c => c.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('unpaid')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'unpaid' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Chưa thanh toán ({registeredCourses.filter(c => c.paymentStatus === 'unpaid').length})
          </button>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.code} • {course.credits} tín chỉ</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                      {getStatusText(course.status)}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(course.paymentStatus)}`}>
                      {getPaymentStatusText(course.paymentStatus)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Giảng viên:</span> {course.instructor}
                  </div>
                  <div>
                    <span className="font-medium">Lịch học:</span> {course.schedule}
                  </div>
                  <div>
                    <span className="font-medium">Phòng:</span> {course.room}
                  </div>
                  <div>
                    <span className="font-medium">Học phí:</span> {course.fee.toLocaleString('vi-VN')}đ
                  </div>
                </div>
                
                <div className="mt-2 text-sm text-gray-500">
                  Đăng ký ngày: {new Date(course.registrationDate).toLocaleDateString('vi-VN')}
                </div>
              </div>
              
              <div className="flex space-x-2 lg:ml-6">
                {course.paymentStatus === 'unpaid' && (
                  <Link
                    href={`/client/courses-pay?course=${course.id}`}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                  >
                    Thanh toán
                  </Link>
                )}
                {course.status === 'pending' && (
                  <button
                    onClick={() => handleCancelCourse(course.id)}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                  >
                    Hủy đăng ký
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Không có môn học nào</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all' ? 'Bạn chưa đăng ký môn học nào' : 'Không có môn học nào phù hợp với bộ lọc'}
          </p>
          <div className="mt-6">
            <Link
              href="/client/courses-reg"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Đăng ký môn học
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}