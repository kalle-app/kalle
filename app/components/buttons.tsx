export const PrimaryButton = ({ href, label }: ButtonProps) => {
  return (
    <a
      href={href}
      className="inline-block px-3 mx-3 py-2 my-2 rounded-md font-sans font-medium text-sm text-white bg-green-400 ring-2 ring-green-500 hover:bg-green-500"
    >
      {label}
    </a>
  )
}

export const SecondaryButton = ({ href, label }: ButtonProps) => {
  return (
    <a
      href={href}
      className="inline-block px-3 mx-3 py-2 my-2 rounded-md font-sans font-medium text-green-500 hover:text-m ring-2 ring-green-500 hover:bg-green-500 hover:text-white"
    >
      {label}
    </a>
  )
}

type ButtonProps = {
  href?: string
  label: string
}

export const TertiaryButton = ({ href, label }: ButtonProps) => {
  return (
    <a
      href={href}
      className="inline-block px-3 mx-3 py-2 my-2 rounded-md font-sans font-medium text-gray-900 hover:text-m hover:bg-gray-200"
    >
      {label}
    </a>
  )
}
