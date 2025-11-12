/**
 * Format date and time utilities for consistent display across the application
 */

export function formatDate(date: Date | string | null | undefined): string {
    if (!date) return "";
    
    try {
        const d = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(d.getTime())) return "";
        
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(d);
    } catch (error) {
        console.warn('Error formatting date:', error);
        return "";
    }
}

export function formatDateTime(date: Date | string | null | undefined): string {
    if (!date) return "";
    
    try {
        const d = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(d.getTime())) return "";
        
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).format(d);
    } catch (error) {
        console.warn('Error formatting datetime:', error);
        return "";
    }
}

export function formatTime(date: Date | string | null | undefined): string {
    if (!date) return "";
    
    try {
        const d = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(d.getTime())) return "";
        
        return new Intl.DateTimeFormat('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).format(d);
    } catch (error) {
        console.warn('Error formatting time:', error);
        return "";
    }
}

export function formatRelativeTime(date: Date | string | null | undefined): string {
    if (!date) return "";
    
    try {
        const d = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(d.getTime())) return "";
        
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
        
        if (diffInSeconds < 60) {
            return "Vừa xong";
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} phút trước`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} giờ trước`;
        } else if (diffInSeconds < 604800) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} ngày trước`;
        } else {
            return formatDate(d);
        }
    } catch (error) {
        console.warn('Error formatting relative time:', error);
        return "";
    }
}

export function formatCurrency(amount: number | null | undefined): string {
    if (amount === null || amount === undefined) return "";
    
    try {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    } catch (error) {
        console.warn('Error formatting currency:', error);
        return amount.toString();
    }
}

export function formatNumber(number: number | null | undefined): string {
    if (number === null || number === undefined) return "";
    
    try {
        return new Intl.NumberFormat('vi-VN').format(number);
    } catch (error) {
        console.warn('Error formatting number:', error);
        return number.toString();
    }
}

export function formatPercentage(value: number | null | undefined, decimals = 2): string {
    if (value === null || value === undefined) return "";
    
    try {
        return new Intl.NumberFormat('vi-VN', {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(value / 100);
    } catch (error) {
        console.warn('Error formatting percentage:', error);
        return `${value}%`;
    }
}

// Utility function to check if a date is today
export function isToday(date: Date | string | null | undefined): boolean {
    if (!date) return false;
    
    try {
        const d = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(d.getTime())) return false;
        
        const today = new Date();
        return d.getDate() === today.getDate() &&
               d.getMonth() === today.getMonth() &&
               d.getFullYear() === today.getFullYear();
    } catch (error) {
        return false;
    }
}

// Utility function to check if a date is in the past
export function isPast(date: Date | string | null | undefined): boolean {
    if (!date) return false;
    
    try {
        const d = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(d.getTime())) return false;
        
        return d.getTime() < Date.now();
    } catch (error) {
        return false;
    }
}