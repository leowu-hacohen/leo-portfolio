interface ObjectIconProps {
  name: string
  rotation: number
  translateY: number
  size?: number
}

export default function ObjectIcon({ name, rotation, translateY, size = 80 }: ObjectIconProps) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        transform: `translateY(${translateY}px) rotate(${rotation}deg)`,
        flexShrink: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/icons/${name}.svg`}
        alt={name}
        width={size}
        height={size}
        style={{ display: 'block', width: `${size}px`, height: `${size}px` }}
      />
    </span>
  )
}
