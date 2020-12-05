type SectionProps = {
  title: string
  subtitle: string
  children: any
}

const Section = (props: SectionProps) => {
  return (
    <div className="mt-10 sm:mt-0">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{props.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{props.subtitle}</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section
