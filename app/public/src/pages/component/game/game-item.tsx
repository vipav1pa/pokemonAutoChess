import React from "react"
import { ItemName, ItemDescription } from "../../../../../types/strings/Item"
import CSS from "csstype"
import { useAppDispatch } from "../../../hooks"
import { itemClick } from "../../../stores/NetworkStore"
import { addIconsToDescription } from "../../utils/descriptions"

const style: CSS.Properties = {
  width: "320px",
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  justifyContent: "space-around",
  textAlign: "center"
}

export default function GameItem(props: { item: string }) {
  const dispatch = useAppDispatch()
  return (
    <div className="nes-container" style={style}>
      <img
        style={{ width: "96px", height: "96px", imageRendering: "pixelated" }}
        src={"assets/item/" + props.item + ".png"}
      ></img>
      <h3>{ItemName[props.item]}</h3>
      <p>{addIconsToDescription(ItemDescription[props.item])}</p>
      <button
        onClick={() => {
          dispatch(itemClick(props.item))
        }}
        type="button"
        className="bubbly blue"
      >
        Pick
      </button>
    </div>
  )
}
