/**
 * Config
 */
export const CONFIG = {
  passedRapidity: 2
};

/**
 * Default item properties
 */
export const DEFAULT_ITEM_PROPS = {
  minQuality: 0,
  maxQuality: 50,
  qualityIncrease: true,
  immutableQuality: false,
  creaseQualityEachDay: -1,
  neverToBeSold: false
};

/**
 * Custom item properties
 */
export const ITEM_PROPS = {
  AGED_BRIE: {
    name: 'Aged Brie',
    qualityIncrease: true,
    immutableQuality: false,
    creaseQualityEachDay: 1, // "Aged Brie" actually increases in Quality the older it gets
    neverToBeSold: false
  },
  BACKSTAGE: {
    name: 'Backstage passes to a TAFKAL80ETC concert',
    qualityIncrease: true,
    immutableQuality: false,
    creaseQualityEachDay: 1,
    specialIncreaseQuality: [
      { lessThanOr: 10, increase: 2 },
      { lessThanOr: 5, increase: 3 }
    ],
    neverToBeSold: false
  },
  SULFURAS: {
    name: 'Sulfuras, Hand of Ragnaros',
    qualityIncrease: false,
    immutableQuality: true,
    creaseQualityEachDay: 0,
    neverToBeSold: true
  },
  CONJURED: {
    name: 'Conjured Mana Cake',
    qualityIncrease: false,
    immutableQuality: false,
    creaseQualityEachDay: -2, // "Conjured" items degrade in Quality twice as fast as normal items
    neverToBeSold: false
  },
  DEXTERITY_VEST: {
    name: '+5 Dexterity Vest',
    qualityIncrease: false,
    immutableQuality: false,
    creaseQualityEachDay: -1,
    neverToBeSold: false
  },
  MONGOOSE_ELIXIR: {
    name: 'Elixir of the Mongoose',
    qualityIncrease: false,
    immutableQuality: false,
    creaseQualityEachDay: -1,
    neverToBeSold: false
  }
};

/**
 * Get item key from item custom props by name
 * @param {*} name String with item name (title)
 */
export const getItemIdByName = function(name) {
  let key;
  for (key in ITEM_PROPS) {
    if (ITEM_PROPS[key].name === name) {
      return key;
    }
  }
  return false;
};

export class Item {
  constructor(name, sellIn, quality){
    let itemId = getItemIdByName(name);
    if (!itemId) {
      return false;
    }
    let props = ITEM_PROPS[itemId];

    // "Sulfuras" never has to be sold
    if (props.neverToBeSold && sellIn < 0) {
      sellIn = 0;
    }

    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      // Get item properties
      let itemId = getItemIdByName(this.items[i].name);
      if (!itemId) {
        return false;
      }
      let props = ITEM_PROPS[itemId];

      // Decrease sellIn
      this.decreaseSellIn(i, props);

      // Update quality
      this.items[i].quality = this.creaseQuality(i, props);
    }

    return this.items;
  };

  decreaseSellIn(i, itemProps) {
    // "Sulfuras" never has to be sold
    if (itemProps.neverToBeSold && this.items[i].sellIn <= 0) {
      this.items[i].sellIn = 0;
      return false;
    }
    this.items[i].sellIn--;
  };

  creaseQuality(i, itemProps) {
    let quality = this.items[i].quality;

    // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
    if (itemProps.immutableQuality) {
      return quality;
    }

    let sellIn = this.items[i].sellIn;
    let specialIncreaseQuality = itemProps.specialIncreaseQuality;
    let minQuality = DEFAULT_ITEM_PROPS.minQuality;
    let maxQuality = DEFAULT_ITEM_PROPS.maxQuality;

    // How much faster is quality creases every day
    let rapidity = 0;
        rapidity += itemProps.creaseQualityEachDay;

    if (specialIncreaseQuality) {
      // Quality drops to 0 after the concert
      if (sellIn <= 0) {
        return minQuality;
      }

      // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
      // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
      for (var j=0, rule, priorityRule; j<specialIncreaseQuality.length; j++) {
        rule = specialIncreaseQuality[j];
        priorityRule = priorityRule || rule;
        if (sellIn <= rule.lessThanOr) {
          priorityRule = rule;
        }
      }
      if (priorityRule) {
        rapidity *= priorityRule.increase;
      }
    }

    // Once the sell by date has passed, Quality degrades twice as fast
    if (sellIn <= minQuality) {
      rapidity *= CONFIG.passedRapidity;
    }

    // Basic setting of quality
    if (quality > minQuality && quality < maxQuality) {
      quality += rapidity;
    }

    // The Quality of an item is never more than 50
    if (quality > maxQuality) {
      quality = maxQuality;
    }

    // The Quality of an item is never negative
    if (quality < minQuality) {
      quality = minQuality;
    }

    return quality;
  };
}
