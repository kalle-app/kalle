import { forwardRef } from "react"

function makeCustomAnchorComponent(className: string) {
  return forwardRef<HTMLAnchorElement, React.HTMLProps<HTMLAnchorElement>>((props, ref) => {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...props} className={className + " " + props.className} ref={ref} />
  })
}

export const PrimaryButton = makeCustomAnchorComponent(
  "inline-block px-3 mx-3 py-2 my-2 rounded-md font-sans font-medium text-sm text-white bg-green-400 ring-2 ring-green-500 hover:bg-green-500"
)
export const SecondaryButton = makeCustomAnchorComponent(
  "inline-block px-3 mx-3 py-2 my-2 rounded-md font-sans font-medium text-green-500 hover:text-m ring-2 ring-green-500 hover:bg-green-500 hover:text-white"
)
export const TertiaryButton = makeCustomAnchorComponent(
  "inline-block px-3 mx-3 py-2 my-2 rounded-md font-sans font-medium text-gray-900 hover:text-m hover:bg-gray-200"
)
