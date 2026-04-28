# Frame Geometry Research - Road, Gravel, Cyclocross

## Purpose
This handoff supports the bike-geometry diagram that labels 12 frame measurements:

- A - Stack
- B - Reach
- C - Trail
- D - Fork Offset
- E - Front Center
- F - Wheelbase
- G - Seat Tube Angle
- H - Head Tube Angle
- I - Chain Stay Length
- J - Effective Top Tube Length
- K - Head Tube Length
- L - Bottom Bracket Drop

## Assumption
Use representative mid-size adult frames rather than full size runs. Full size runs make fit-driven measurements like stack, reach, top tube, and head tube length too broad for a beginner comparison. These ranges are intended for explanatory UI copy, not fitting advice.

This document should be treated as a research handoff, not final production copy. The sample set must stay broad: at least 8 road bikes, 8 gravel bikes, and a European-leaning cyclocross set. Do not collapse the comparison down to one or two bikes per category.

Reference sizes used for the current range pass:

- Road: mid-size performance/race road frames, roughly 51/52 through 58/L
- Gravel: mid-size gravel frames, roughly 52/S through 58/L
- Cyclocross: European-leaning CX race frames, roughly S/M through L, with bottom bracket drop commonly around 60-70 mm

Linear values are in millimeters. Seat tube angle and head tube angle are in degrees because those measurements cannot be expressed in millimeters.

## Comprehensive Source Targets

Use this source set before final UI implementation. Prefer official geometry pages. Use Bike Insights or reputable review geometry tables only when they cite the manufacturer or when the official page is hard to scrape. Avoid Geometry Geeks rows when the values are visibly corrupted.

### Road sample - minimum 8 models
| Brand/model | Source status | Why it is included |
|---|---|---|
| Specialized Tarmac SL8 | Official geometry page found | User requested Tarmac; core modern race-road reference |
| Cervelo Soloist | Official geometry page found | User requested Soloist; race/all-road road reference |
| Cervelo R5 | Official geometry page found | Modern lightweight road-race comparison |
| Canyon Ultimate CFR/CF SL | Official Canyon geometry table found | Clean complete modern race-road table |
| Factor Ostro VAM | Official geometry page found | User requested Factor; aero-road reference |
| Trek Madone SLR Gen 8 | RoadBikeDatabase/Bike Insights with Trek source used | User requested Madone; official Trek table is hard to scrape directly |
| Cannondale SuperSix EVO | Official page and secondary geometry references found | User requested Cannondale; verify exact table before citation-heavy UI |
| Cannondale CAAD10 | Cannondale owner/manual PDF found | User requested CAAD10; legacy aluminum comparison |
| Scott Addict RC | Review/source values found | Optional ninth road sample if CAAD10 is treated as legacy-only |

### Gravel sample - minimum 8 models
| Brand/model | Source status | Why it is included |
|---|---|---|
| Specialized Diverge Comp Carbon | Official geometry page found | Core mainstream gravel reference |
| Canyon Grizl | Official Canyon geometry table found | Clean complete gravel/adventure table |
| Scott Addict Gravel | Scott product page and BikeRadar geometry table found | User requested Scott; fast gravel reference |
| Felt Breed / Breed Carbon | BikeRadar/Felt-linked geometry table found | User requested Felt; aggressive gravel reference |
| Allied ABLE | Official geometry page found | User requested Allied ABLE; race gravel reference |
| Cervelo Aspero | Official geometry page found | Fast road-like gravel reference |
| Trek Checkpoint | Secondary Trek-linked geometry references found | Major gravel reference; verify official table if used as citation |
| Cannondale Topstone Carbon | Cannondale page and BikeRadar geometry table found | Major gravel/adventure reference |
| Canyon Grail | Optional ninth sample | Useful if replacing a less complete source |

### Cyclocross sample - European-leaning geometry
Focus on European-style cyclocross geometry and bottom bracket drops around 60-70 mm. These bikes keep the bottom bracket higher than many gravel frames for clearance, remounts, mud, and race handling.

| Brand/model | Source status | Why it is included |
|---|---|---|
| Canyon Inflite | Official Canyon table found | Core European CX reference |
| Ridley X-Night RS | Official/Ridley-linked reference found | Belgian CX reference |
| Cube Cross Race C:68X | Cube-linked geometry reference found | German CX reference |
| Stevens Super Prestige | Stevens-linked geometry reference found | German CX reference |
| Focus Mares | Focus archive/Bike Insights reference found | German CX reference |
| Bianchi Zolder Pro | Official/secondary geometry reference found | Italian/European CX reference |
| Scott Addict CX RC | Review/source values found | European-market CX race reference |
| Specialized Crux | Official geometry page found | Non-European contrast; useful boundary check, not the primary CX target |

## UI Layout Instruction
For each measurement on the diagram, place a small comparison table below the measurement description.

Table behavior:

- Table is left-aligned under the start of the sentence/description above.
- Frame type labels are centered.
- Numeric ranges are centered.
- Use three columns and two rows:
  - Row 1: Road / Gravel / Cyclocross
  - Row 2: typical range for that frame type

## Measurement Tables

### A - Stack
| Road | Gravel | Cyclocross |
|:---:|:---:|:---:|
| 515-591 mm | 530-634 mm | 526-597 mm |

### B - Reach
| Road | Gravel | Cyclocross |
|:---:|:---:|:---:|
| 374-402 mm | 379-415 mm | 379-405 mm |

### C - Trail
| Road | Gravel | Cyclocross |
|:---:|:---:|:---:|
| 55-61 mm | 58-71 mm | 62-71 mm |

### D - Fork Offset
| Road | Gravel | Cyclocross |
|:---:|:---:|:---:|
| 40-55 mm | 46-55 mm | 45-50 mm |

### E - Front Center
| Road | Gravel | Cyclocross |
|:---:|:---:|:---:|
| 574-611 mm | 602-651 mm | 588-623 mm |

### F - Wheelbase
| Road | Gravel | Cyclocross |
|:---:|:---:|:---:|
| 968-1011 mm | 1010-1078 mm | 1006-1040 mm |

### G - Seat Tube Angle
| Road | Gravel | Cyclocross |
|:---:|:---:|:---:|
| 73-74.5 deg | 73-75 deg | 73.2-74.5 deg |

### H - Head Tube Angle
| Road | Gravel | Cyclocross |
|:---:|:---:|:---:|
| 72-73.8 deg | 69-72 deg | 71-72.5 deg |

### I - Chain Stay Length
| Road | Gravel | Cyclocross |
|:---:|:---:|:---:|
| 405-413 mm | 420-435 mm | 425 mm |

### J - Effective Top Tube Length
| Road | Gravel | Cyclocross |
|:---:|:---:|:---:|
| 526-581 mm | 542-589 mm | 534-578 mm |

### K - Head Tube Length
| Road | Gravel | Cyclocross |
|:---:|:---:|:---:|
| 106-184 mm | 97-188 mm | 110-170 mm |

### L - Bottom Bracket Drop
| Road | Gravel | Cyclocross |
|:---:|:---:|:---:|
| 68-77 mm | 72-85 mm | 60-70 mm |

## Compact Data Table
| Key | Measurement | Road | Gravel | Cyclocross |
|:---:|---|:---:|:---:|:---:|
| A | Stack | 515-591 mm | 530-634 mm | 526-597 mm |
| B | Reach | 374-402 mm | 379-415 mm | 379-405 mm |
| C | Trail | 55-61 mm | 58-71 mm | 62-71 mm |
| D | Fork Offset | 40-55 mm | 46-55 mm | 45-50 mm |
| E | Front Center | 574-611 mm | 602-651 mm | 588-623 mm |
| F | Wheelbase | 968-1011 mm | 1010-1078 mm | 1006-1040 mm |
| G | Seat Tube Angle | 73-74.5 deg | 73-75 deg | 73.2-74.5 deg |
| H | Head Tube Angle | 72-73.8 deg | 69-72 deg | 71-72.5 deg |
| I | Chain Stay Length | 405-413 mm | 420-435 mm | 425 mm |
| J | Effective Top Tube Length | 526-581 mm | 542-589 mm | 534-578 mm |
| K | Head Tube Length | 106-184 mm | 97-188 mm | 110-170 mm |
| L | Bottom Bracket Drop | 68-77 mm | 72-85 mm | 60-70 mm |

## Source Notes
- Road ranges now combine the requested road set: Tarmac, Soloist, CAAD10/Cannondale, Madone, Factor, Cervelo R5, Canyon Ultimate, and supporting Scott Addict RC values.
- Gravel ranges now combine the requested gravel set: Scott Addict Gravel, Felt Breed, Specialized Diverge, Canyon Grizl/Grail, Allied ABLE, Cervelo Aspero, Trek Checkpoint, and Cannondale Topstone.
- Cyclocross ranges intentionally focus on European-style CX geometry, with bottom bracket drop constrained to 60-70 mm rather than gravel-like 75-85 mm.
- Some secondary aggregator pages returned visibly corrupted full-table rows. Do not use those values in production without checking against the linked manufacturer source. Bike Insights and BikeRadar values are acceptable for research handoff when they cite manufacturer/source pages.

## Sources
- Specialized Tarmac SL8 Expert geometry: https://www.specialized.com/us/en/tarmac-sl8-expert-sram-force-axs-/p/4293510
- Cervelo R5 geometry: https://www.cervelo.com/en-US/bikes/r5
- Cervelo Soloist geometry: https://www.cervelo.com/en-CH/bikes/soloist
- Factor Ostro VAM geometry: https://factorbikes.com/bikes/ostro-vam
- Specialized Diverge Comp Carbon geometry: https://www.specialized.com/us/en/diverge-comp-carbon/p/175285
- Canyon Grizl 6 geometry PDF/table: https://www.canyon.com/en-us/productpdf/geometry/?pid=2844
- Allied ABLE geometry: https://alliedcycleworks.com/products/able-ex-frameset
- Cervelo Aspero geometry: https://www.cervelo.com/en-US/bikes/aspero-2023
- Specialized CruX Expert geometry: https://www.specialized.com/us/en/crux-expert/p/154298
- Canyon Inflite CFR geometry: https://www.canyon.com/en-us/inflite-cfr/50029232.html
- Canyon Inflite CF SL geometry PDF/table: https://www.canyon.com/en-us/productpdf/geometry/?pid=3549
- Ridley X-Night RS reference: https://www.ridley-bikes.com/en_US/bikes/FFSXRSRID003
- Cube Cross Race C:68X reference: https://www.cube.eu/es-en/cube-cross-race-c-68x-te-liquidblue-n-flashyellow/c7afea3ca1dc48fe193500d989c1885e
- Stevens Super Prestige reference: https://www.stevensbikes.de/2021/en/de/road/cyclocross/super-prestige-force-etap-axs/
- Bianchi Zolder Pro reference: https://www.bianchi.com/bikes/road/cyclocross-road/zolder-pro/
- Canyon Ultimate geometry PDF/table: https://www.canyon.com/en-us/productpdf/geometry/?pid=3858
- Cannondale SuperSix EVO 4 product/reference: https://www.cannondale.com/en-us/bikes/road/race/supersix-evo/supersix-evo-4
- Cannondale SuperSix EVO owner manual PDF / CAAD-style legacy reference pattern: https://www.cannondale.com/en-us/owners-manuals/-/media/files/manual-uploads/manuals/015_oms_supersix_evo_133349_en.pdf
- Trek Madone Gen 8 geometry reference: https://roadbikedatabase.com/bikes/2025/trek/madone/2025-trek-madone-slr-gen-8-frameset/
- Scott Addict Gravel geometry reference: https://www.bikeradar.com/reviews/bikes/scott-addict-gravel-30-review
- Felt Breed Carbon geometry reference: https://www.bikeradar.com/news/felt-breed-carbon/
- Trek Checkpoint geometry reference: https://geometrygeeks.bike/bike/trek-checkpoint-sl-2025/
- Cannondale Topstone Carbon geometry reference: https://www.bikeradar.com/news/2022-cannondale-topstone-carbon
- Focus Mares CX geometry reference: https://bikeinsights.com/bike-geometries/6631a2b60f70f500217941ae-2018-focus-bikes-mares-cx-105-m
