import { Shop, Item } from '../gilded_rose';

// Expected values for each day
const dayByDay = [
  [ // day 0
    { name: "+5 Dexterity Vest", sellIn: 10, quality: 20 },
    { name: "Aged Brie", sellIn: 2, quality: 0 },
    { name: "Elixir of the Mongoose", sellIn: 5, quality: 7 },
    { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
    { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 15, quality: 20 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 49 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 49 },
    { name: "Conjured Mana Cake", sellIn: 3, quality: 6 }
  ],
  [ // day 1
    { name: "+5 Dexterity Vest", sellIn: 9, quality: 19 },
    { name: "Aged Brie", sellIn: 1, quality: 1 },
    { name: "Elixir of the Mongoose", sellIn: 4, quality: 6 },
    { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
    { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 14, quality: 21 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 9, quality: 50 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 4, quality: 50 },
    { name: "Conjured Mana Cake", sellIn: 2, quality: 4 }
  ],
  [ // day 2
    { name: "+5 Dexterity Vest", sellIn: 8, quality: 18 },
    { name: "Aged Brie", sellIn: 0, quality: 2 },
    { name: "Elixir of the Mongoose", sellIn: 3, quality: 5 },
    { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
    { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 13, quality: 22 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 8, quality: 50 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 3, quality: 50 },
    { name: "Conjured Mana Cake", sellIn: 1, quality: 2 }
  ],
  [ // day 3
    { name: "+5 Dexterity Vest", sellIn: 7, quality: 17 },
    { name: "Aged Brie", sellIn: -1, quality: 3 },
    { name: "Elixir of the Mongoose", sellIn: 2, quality: 4 },
    { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
    { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 12, quality: 23 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 7, quality: 50 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 2, quality: 50 },
    { name: "Conjured Mana Cake", sellIn: 0, quality: 0 }
  ],
  [ // day 4
    { name: "+5 Dexterity Vest", sellIn: 6, quality: 16 },
    { name: "Aged Brie", sellIn: -2, quality: 4 },
    { name: "Elixir of the Mongoose", sellIn: 1, quality: 3 },
    { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
    { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 11, quality: 24 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 6, quality: 50 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 1, quality: 50 },
    { name: "Conjured Mana Cake", sellIn: -1, quality: 0 }
  ],
  [ // day 5
    { name: "+5 Dexterity Vest", sellIn: 5, quality: 15 },
    { name: "Aged Brie", sellIn: -3, quality: 5 },
    { name: "Elixir of the Mongoose", sellIn: 0, quality: 2 },
    { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
    { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 26 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 50 },
    { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 0, quality: 0 },
    { name: "Conjured Mana Cake", sellIn: -2, quality: 0 }
  ]
];

describe("Gilded Rose", function () {
  it("item does not exist in item properties list", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items).toEqual(false);
  });

  // Input data for check
  const items = [];
  items.push(new Item('+5 Dexterity Vest', 10, 20));
  items.push(new Item('Aged Brie', 2, 0));
  items.push(new Item('Elixir of the Mongoose', 5, 7));
  items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
  items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 80));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49));
  items.push(new Item('Conjured Mana Cake', 3, 6));

  const gildedRose = new Shop(items);
  const days = dayByDay.length;

  for (let i=0; i<days; i++) {
    for (let j=0; j<gildedRose.items.length; j++) {
      const item = gildedRose.items[j];
      const sellIn = item.sellIn;
      const quality = item.quality;

      it('check sellIn for day ' + i + ', item ' + gildedRose.items[j].name, function () {
        expect(sellIn).toEqual(dayByDay[i][j].sellIn);
      });

      it('check quality for day ' + i + ', item ' + gildedRose.items[j].name, function () {
        expect(quality).toEqual(dayByDay[i][j].quality);
      });
    }
    gildedRose.updateQuality();
  }
});
