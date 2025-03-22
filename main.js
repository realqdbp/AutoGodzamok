Game.registerMod("autogodzamok", {

    init: function () {
        Game.Notify(`Auto Godzamok loaded!`, 'Change the amount in the Settings.', [23, 18]);

        Game.registerHook("draw", () => {
            this.modMenu()
        })

        Game.registerHook("logic", () => {
            this.autoGodzamok()
        })
    },

    save: function () {
        return `${Game.mods["autogodzamok"].amount}`
    },

    load: function (str) {
        try {
            Game.mods["autogodzamok"].amount = parseInt(str);
        } catch (ignored) {
            Game.mods["autogodzamok"].amount = 0
        }
    },

    modMenu: () => {
        const menuID = "autogodzamokMenu"

        if (Game.onMenu !== "prefs") return
        if (l("menu").querySelector("#" + menuID) != null) return

        const blocks = l("menu").querySelectorAll(".block")
        const lastBlock = blocks[blocks.length - 1]

        const block = document.createElement("div")
        block.className = "block"
        block.id = menuID
        block.style.padding = "0px"
        block.style.margin = "8px 4px"

        const subsection = document.createElement("div")
        subsection.className = "subsection"
        subsection.style.padding = "0px"
        block.appendChild(subsection)

        const title = document.createElement("div")
        title.className = "title"
        title.textContent = "Auto Godzamok"
        subsection.appendChild(title)

        const listing = document.createElement("div")
        listing.className = "listing"
        subsection.appendChild(listing)

        const sliderBox = document.createElement("div")
        sliderBox.className = "sliderBox"
        listing.appendChild(sliderBox)

        const button = document.createElement("div")
        button.className = "smallFancyButton"
        button.style.float = "left"
        button.textContent = "Sell/Re-Buy Amount"
        sliderBox.appendChild(button)

        const text = document.createElement("div")
        text.className = "smallFancyButton"
        text.style.float = "right"
        text.textContent = Game.mods["autogodzamok"].amount
        sliderBox.appendChild(text)

        const input = document.createElement("input")
        input.type = "number"
        input.min = "0"
        input.value = Game.mods["autogodzamok"].amount
        input.onchange = function () { Game.mods["autogodzamok"].amount = isNaN(input.valueAsNumber) ? 0 : input.valueAsNumber }
        sliderBox.appendChild(input)

        const inputLabel = document.createElement("label")
        inputLabel.textContent = "Sets the amount of Farms that should be sold and re-bought."
        listing.appendChild(inputLabel)

        l("menu").insertBefore(block, lastBlock.nextSibling)
    },

    autoGodzamok: () => {
        if (!Game.Objects.Temple.minigame?.slot?.includes(2)) return
        if (Game.buffs.Devastation !== undefined) return

        const amount = Game.mods["autogodzamok"].amount
        Game.Objects.Farm.sell(amount)
        Game.Objects.Farm.buy(amount)
    }
});