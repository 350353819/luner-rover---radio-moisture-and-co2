input.onButtonPressed(Button.A, function () {
    radio.sendNumber(Math.round(COZIR.Co2()))
    radio.sendString("PPM")
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
input.onButtonPressed(Button.B, function () {
    if (soil.ifMoisture(soil.SoilPin.P0, Mlevel.VERY_WET)) {
        basic.showIcon(IconNames.Happy)
        radio.sendString("SOIL SAMPLE VERY WET")
    } else if (soil.ifMoisture(soil.SoilPin.P0, Mlevel.WET)) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . # . #
            . # . # .
            `)
        radio.sendString("SOIL SAMPLE WET")
    } else if (soil.ifMoisture(soil.SoilPin.P0, Mlevel.DRY)) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # # # # #
            . . . . .
            `)
        radio.sendString("SOIL SAMPLE DRY")
    } else {
        basic.showIcon(IconNames.Sad)
        radio.sendString("SOIL SAMPLE VERY DRY")
    }
})
input.onGesture(Gesture.Shake, function () {
    serial.redirect(
    SerialPin.P0,
    SerialPin.P1,
    BaudRate.BaudRate9600
    )
    basic.pause(500)
})
radio.setGroup(80)
radio.sendString("CONNECTED")
