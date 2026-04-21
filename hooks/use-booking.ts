import { useState } from 'react'
import { packages } from '@/lib/mock-data'
import type { Hall, BookingFormData } from '@/types'

export type BookingStep = 1 | 2 | 3 | 4

export function useBooking() {
	const [step, setStep] = useState<BookingStep>(1)
	const [data, setData] = useState<BookingFormData>({
		date: '',
		startTime: '',
		endTime: '',
		selectedPackages: [],
	})
	const [confirmed, setConfirmed] = useState(false)

	const reset = () => {
		setStep(1)
		setData({ date: '', startTime: '', endTime: '', selectedPackages: [] })
		setConfirmed(false)
	}

	const togglePackage = (id: string) => {
		setData(prev => ({
			...prev,
			selectedPackages: prev.selectedPackages.includes(id)
				? prev.selectedPackages.filter(p => p !== id)
				: [...prev.selectedPackages, id],
		}))
	}

	const calculateTotal = (hall: Hall): number => {
		const start = parseInt(data.startTime.split(':')[0] || '0')
		const end = parseInt(data.endTime.split(':')[0] || '0')
		const hours = end > start ? end - start : 0
		const packagesCost = data.selectedPackages.reduce((sum, pkgId) => {
			const pkg = packages.find(p => p.id === pkgId)
			return sum + (pkg?.price ?? 0)
		}, 0)
		return hall.pricePerHour * hours + packagesCost
	}

	const confirm = () => {
		setConfirmed(true)
		setStep(4)
	}

	const goBack = () => {
		if (step > 1) setStep(s => (s - 1) as BookingStep)
	}

	return {
		step,
		setStep,
		data,
		setData,
		confirmed,
		reset,
		togglePackage,
		calculateTotal,
		confirm,
		goBack,
	}
}
