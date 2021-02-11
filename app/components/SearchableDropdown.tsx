import React, { forwardRef, useState } from "react"
import { Dropdown, FormControl } from "react-bootstrap"

const CustomToggle = forwardRef<
  any,
  {
    onClick(): void
  }
>(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}
  >
    {children}
    &#x25bc;
  </a>
))

const CustomMenu = forwardRef<
  any,
  {
    style: any
    className: any
    "aria-labelledby": any
  }
>(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
  const [value, setValue] = useState("")

  let itemsToShow
  if (value) {
    itemsToShow = React.Children.toArray(children).filter((child) =>
      (child as any).props.children.toLowerCase().includes(value.toLowerCase())
    )
  } else {
    itemsToShow = children
  }

  return (
    <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
      <FormControl
        autoFocus
        className="mx-3 my-2 w-auto"
        placeholder="Type to filter..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <ul className="list-unstyled">{itemsToShow}</ul>
    </div>
  )
})

interface SearchableDropdownProps {
  value: string
  options: string[]
  description: string
  onSelect(option: string): void
}

export function SearchableDropdown(props: SearchableDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {props.value}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu as any}>
        {props.options.map((option) => (
          <Dropdown.Item
            active={option === props.value}
            key={option}
            eventKey={option}
            onSelect={() => props.onSelect(option)}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
