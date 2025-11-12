'use client'

import { useState, useEffect } from 'react'

interface PaymentCourse {
  id: string
  code: string
  name: string
  credits: number
  fee: number
  status: 'unpaid' | 'paid'
}

interface PaymentMethod {
  id: string
  name: string
  description: string
  iconType: string
  isAvailable: boolean
}

export default function CoursesPayPage() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [preselectedCourse, setPreselectedCourse] = useState<string | null>(null)

  // Handle URL params on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const course = params.get('course')
      if (course) {
        setPreselectedCourse(course)
      }
    }
  }, [])

  const unpaidCourses: PaymentCourse[] = [
    {
      id: '2',
      code: 'CS201',
      name: 'Lập trình hướng đối tượng',
      credits: 3,
      fee: 2500000,
      status: 'unpaid'
    },
    {
      id: '3',
      code: 'CS301',
      name: 'Cơ sở dữ liệu',
      credits: 3,
      fee: 2500000,
      status: 'unpaid'
    },
    {
      id: '4',
      code: 'CS401',
      name: 'Mạng máy tính',
      credits: 3,
      fee: 2500000,
      status: 'unpaid'
    }
  ]

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'bank_transfer',
      name: 'Chuyển khoản ngân hàng',
      description: 'Chuyển khoản qua tài khoản ngân hàng của trường',
      isAvailable: true,
      iconType: 'AccountBalance'
    },
    {
      id: 'momo',
      name: 'Ví điện tử MoMo',
      description: 'Thanh toán nhanh chóng qua ví MoMo',
      isAvailable: true,
      iconType: 'PhoneAndroid'
    },
    {
      id: 'vnpay',
      name: 'VNPay',
      description: 'Thanh toán qua cổng VNPay',
      isAvailable: true,
      iconType: 'CreditCard'
    },
    {
      id: 'cash',
      name: 'Tiền mặt',
      description: 'Thanh toán trực tiếp tại phòng tài chính',
      isAvailable: true,
      iconType: 'Money'
    }
  ]

  const getPaymentIcon = (iconType: string) => {
    // For now, return simple text since we need to import Material-UI icons
    switch (iconType) {
      case 'AccountBalance': return '🏦'
      case 'PhoneAndroid': return '📱'
      case 'CreditCard': return '💳'
      case 'Money': return '💰'
      default: return '💳'
    }
  }

  // Pre-select course if specified in URL
  useEffect(() => {
    if (preselectedCourse && unpaidCourses.find(c => c.id === preselectedCourse)) {
      setSelectedCourses([preselectedCourse])
    }
  }, [preselectedCourse])

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const handleSelectAll = () => {
    setSelectedCourses(
      selectedCourses.length === unpaidCourses.length 
        ? [] 
        : unpaidCourses.map(c => c.id)
    )
  }

  const handlePayment = () => {
    if (selectedCourses.length === 0) {
      alert('Vui lòng chọn ít nhất một môn học để thanh toán')
      return
    }
    if (!selectedPaymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán')
      return
    }
    setShowConfirmModal(true)
  }

  const confirmPayment = () => {
    // Handle payment processing
    alert(`Thanh toán thành công ${selectedCourses.length} môn học!`)
    setSelectedCourses([])
    setSelectedPaymentMethod('')
    setShowConfirmModal(false)
  }

  const getTotalAmount = () => {
    return selectedCourses.reduce((total, courseId) => {
      const course = unpaidCourses.find(c => c.id === courseId)
      return total + (course?.fee || 0)
    }, 0)
  }

  const getSelectedCourses = () => {
    return unpaidCourses.filter(course => selectedCourses.includes(course.id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thanh toán học phí</h1>
          <p className="text-gray-600">Thanh toán học phí cho các môn học đã đăng ký</p>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Tổng kết thanh toán</h2>
            <p className="text-blue-100">
              {selectedCourses.length} môn học được chọn
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">
              {getTotalAmount().toLocaleString('vi-VN')} đ
            </p>
            <p className="text-blue-100">Tổng số tiền</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Chọn môn học cần thanh toán
                </h3>
                <button
                  onClick={handleSelectAll}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {selectedCourses.length === unpaidCourses.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {unpaidCourses.map((course) => (
                  <div key={course.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
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
                            <h4 className="text-sm font-medium text-gray-900">{course.name}</h4>
                            <p className="text-sm text-gray-500">{course.code} • {course.credits} tín chỉ</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">
                              {course.fee.toLocaleString('vi-VN')} đ
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              {unpaidCourses.length === 0 && (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Không có học phí cần thanh toán</h3>
                  <p className="mt-1 text-sm text-gray-500">Tất cả học phí đã được thanh toán</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Chọn phương thức thanh toán
              </h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className={`
                    border rounded-lg p-4 cursor-pointer transition-colors
                    ${selectedPaymentMethod === method.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                    ${!method.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}
                  `}>
                    <label className="cursor-pointer flex items-start space-x-3">
                      <input
                        type="radio"
                        name="payment-method"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        disabled={!method.isAvailable}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className={selectedPaymentMethod === method.id ? 'text-blue-600' : 'text-gray-400'}>
                            {getPaymentIcon(method.iconType)}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">{method.name}</div>
                            <div className="text-sm text-gray-500">{method.description}</div>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Chi tiết thanh toán</h3>
            
            {selectedCourses.length === 0 ? (
              <p className="text-gray-500 text-sm">Chưa chọn môn học nào</p>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {getSelectedCourses().map((course) => (
                    <div key={course.id} className="flex justify-between items-start text-sm">
                      <div className="flex-1 pr-2">
                        <div className="font-medium text-gray-900">{course.name}</div>
                        <div className="text-gray-500">{course.code}</div>
                      </div>
                      <div className="text-gray-900 font-medium">
                        {course.fee.toLocaleString('vi-VN')}đ
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Số môn học:</span>
                    <span className="font-semibold">{selectedCourses.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tổng học phí:</span>
                    <span className="font-semibold">{getTotalAmount().toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Phí giao dịch:</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-base font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">{getTotalAmount().toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={selectedCourses.length === 0 || !selectedPaymentMethod}
                  className="w-full mt-6 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Thanh toán ngay
                </button>
              </>
            )}

            {/* Payment Info */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Lưu ý quan trọng</p>
                  <ul className="mt-1 list-disc list-inside space-y-1 text-xs">
                    <li>Hạn cuối thanh toán: 30/01/2024</li>
                    <li>Sau khi thanh toán, vui lòng lưu lại biên lai</li>
                    <li>Liên hệ phòng tài chính nếu có vấn đề</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Xác nhận thanh toán</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Số môn học:</span>
                <span className="font-semibold">{selectedCourses.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Tổng số tiền:</span>
                <span className="font-semibold">{getTotalAmount().toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Phương thức:</span>
                <span className="font-semibold">
                  {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              Bạn có chắc chắn muốn thực hiện thanh toán này?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={confirmPayment}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}