interface SectionHeaderProps {
  title: string
  subtitle: string
}

const SectionHeader = (props: SectionHeaderProps) => {
  return (
    <div className="p-3">
      <h5 className="font-weight-bold">{props.title}</h5>
      <p>{props.subtitle}</p>
    </div>
  )
}

export default SectionHeader
