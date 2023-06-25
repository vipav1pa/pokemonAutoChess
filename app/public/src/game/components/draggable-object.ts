/* eslint-disable @typescript-eslint/no-empty-function */
import { GameObjects } from "phaser"

export default class DraggableObject extends GameObjects.Container {
  dragDisabled: boolean

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    dragDisabled: boolean = false
  ) {
    super(scene, x, y)
    this.dragDisabled = dragDisabled
    this.setSize(width, height)
    this.setInteractive()
      .on("pointerover", () => this.onPointerOver())
      .on("pointerout", () => this.onPointerOut())
      .on(
        "pointerdown",
        (
          pointer: Phaser.Input.Pointer,
          x: number,
          y: number,
          event: Phaser.Types.Input.EventData
        ) => {
          event.stopPropagation()
          this.onPointerDown(pointer)
        }
      )
      .on("pointerup", () => this.onPointerUp())
    this.scene.add.existing(this)
  }

  get draggable(): boolean {
    return !this.dragDisabled
  }

  set draggable(isDraggable: boolean){
    this.dragDisabled = !isDraggable
    this.scene.input.setDraggable(this, isDraggable)
  }

  onPointerOver() {
    if (!this.dragDisabled) {
      document.body.classList.add("grab")
    }
  }

  onPointerOut() {
    if (!this.dragDisabled) {
      document.body.classList.remove("grab")
    }
  }

  onPointerDown(pointer) {
    if (!this.dragDisabled) {
      document.body.classList.add("grabbing")
    }
  }

  onPointerUp() {
    if (!this.dragDisabled) {
      document.body.classList.remove("grabbing")
      document.body.classList.add(
        "grab"
      ) /* if it was grabbing, should still be over target when releasing */
    }
  }
}
