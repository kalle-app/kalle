interface SectionHeaderProps {
  title: string
  subtitle: string
}

const SectionHeader = (props: SectionHeaderProps) => {
  return (
    <div className="pb-5">
      <h3 className="text-lg font-medium leading-6 text-gray-900">{props.title}</h3>
      <p className="mt-1 text-sm text-gray-600">{props.subtitle}</p>
    </div>
  )
}

export default SectionHeader
