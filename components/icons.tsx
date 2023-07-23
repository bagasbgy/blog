import React from "react"

interface IconProps extends React.HTMLAttributes<HTMLElement> {
    iconName: string
}

export const Icon: React.FC<IconProps> = ({ iconName, ...props }) => {
    const baseClassName = "material-icons-outlined"

    return (
        <span
            {...props}
            className={baseClassName + (props.className ? " " + props.className : "")}
            style={{ ...props.style, verticalAlign: "inherit" }}
        >
            {iconName}
        </span>
    )
}
