interface ObjectIconProps {
  name: string
  rotation: number
  translateY: number
}

export default function ObjectIcon({ name, rotation, translateY }: ObjectIconProps) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '140px',
        height: '140px',
        // translateY first keeps the vertical offset in screen space; rotate then tilts in place
        transform: `translateY(${translateY}px) rotate(${rotation}deg)`,
        flexShrink: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/icons/${name}.svg`}
        alt={name}
        width={140}
        height={140}
        style={{ display: 'block', width: '140px', height: '140px' }}
      />
    </span>
  )
}
