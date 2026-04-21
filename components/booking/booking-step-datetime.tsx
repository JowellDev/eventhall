import { ChevronRight } from 'lucide-react'
import type { BookingFormData } from '@/types'

interface BookingStepDatetimeProps {
	data: BookingFormData
	onChange: (data: BookingFormData) => void
	onNext: () => void
}

export function BookingStepDatetime({
	data,
	onChange,
	onNext,
}: BookingStepDatetimeProps) {
	const inputStyle = {
		background: '#111',
		borderColor: 'rgba(212,175,55,0.2)',
	}

	return (
		<div className="space-y-4">
			<div>
				<label className="block text-sm font-body font-medium text-foreground mb-2">
					Date de l&apos;événement
				</label>
				<input
					type="date"
					className="w-full px-4 py-3 rounded-xl text-sm font-body text-foreground outline-none border focus:border-gold transition-colors"
					style={inputStyle}
					value={data.date}
					onChange={e => onChange({ ...data, date: e.target.value })}
				/>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-body font-medium text-foreground mb-2">
						Heure de début
					</label>
					<input
						type="time"
						className="w-full px-4 py-3 rounded-xl text-sm font-body text-foreground outline-none border focus:border-gold transition-colors"
						style={inputStyle}
						value={data.startTime}
						onChange={e => onChange({ ...data, startTime: e.target.value })}
					/>
				</div>
				<div>
					<label className="block text-sm font-body font-medium text-foreground mb-2">
						Heure de fin
					</label>
					<input
						type="time"
						className="w-full px-4 py-3 rounded-xl text-sm font-body text-foreground outline-none border focus:border-gold transition-colors"
						style={inputStyle}
						value={data.endTime}
						onChange={e => onChange({ ...data, endTime: e.target.value })}
					/>
				</div>
			</div>
			<button
				onClick={onNext}
				disabled={!data.date || !data.startTime || !data.endTime}
				className="w-full py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
				style={{
					background: 'linear-gradient(135deg, #d4af37, #f4c430)',
					color: '#0a0a0a',
				}}
			>
				Continuer
				<ChevronRight className="w-4 h-4 inline ml-1" />
			</button>
		</div>
	)
}
