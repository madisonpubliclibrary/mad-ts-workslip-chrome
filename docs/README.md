# MAD-TS Workslip

| Current Version | Install on Google Chrome | Author |
| :-------------: | :----------------: | :----: |
| <br>0.9         | <br>[Install MAD-TS Workslip][1] | Lucas Schneider<br>Library Page II<br>MPL–Central |

This extension is developed for the Technical Services department of Madison Central Library in Madison, WI. It aggregates data from GetIt and Liblime Koha to streamline acquisitions processing by generating a printable workslip.

## How to Generate workslip
1. Open up GetIt, navigate to purchase order line (i.e. purchase order for item).
2. Right click anywhere in GetIt. (I prefer white space)
3. Click on "Print MAD-TS Workslip"
4. Wait up to 5 seconds for the browser to open and navigate to Workslip print tab. (It will also open up and then close two other tabs as it collects data.)
5. Workslip tab should automatically close after printing.

**Note:** There is also the keyboard shortcut [CTRL] + [;] as an alternative to using the context menu (i.e. right-click menu)

## Other Notes
Workslip folds in half best when page setup is landscape orientation, scale: 100%.

## Explanation of Workslip
The table below lists what fields are present on the first half of the workslip, where the data is scraped from, and notes about how it's displayed.

| Field | Data Source | Notes |
| :---: | :---------: | :---: |
| Street Date | N/A | Staff will write in the street date |
| (Super) Rush Order! | GetIt | "Rush Order!" Appears if "rush" appears in the text of any staff notes or the Order Line Reference field (aka: purchase order name). "Super" is added to the note if there are 50 or more holds on the bib record. |
| Purchase Order No. | GetIt |  |
| Date | N/A |  |
| Holds | Koha Normal Screen | When there is a bib record ID linked in GetIt, but that bib record doesn't exist in Koha, the extension will print the Workslip and type "No bib in Koha" in the Holds field. |
| Title | GetIt | Field hidden if no data |
| Author | GetIt | Field hidden if no data |
| Bib Record ID | GetIt | Field hidden if no data |
| MARC 300 | Koha Item Record | Scraped data from MARC 300 (Description) field (including subfields a, b, c, and e) |
| EAN 13 | GetIt | Field hidden if no data |
| MARC 092 | Koha Item Record  | Scraped data from MARC 092 field (including subfields a and b) |
| MARC 099a | Koha Item Record  | Scraped data from MARC 099 subfield a |
| ISBN | GetIt | Field hidden if no data |
| ISSN | GetIt | Field hidden if no data |
| ISMN | GetIt | Field hidden if no data |
| UPC | GetIt | Field hidden if no data |
| Manufacturer No. | GetIt | Field hidden if no data |
| Supplier No. | GetIt | Field hidden if no data |
| Publisher | GetIt | Field hidden if no data |
| List Price | GetIt | Field hidden if no data |
| Discounted Price | GetIt | Field hidden if no data |
| Date of Pub. | GetIt | Field hidden if no data; Date copied in whatever format it is stored in GetIt |
| Edition | GetIt | Field hidden if no data |
| GetIt Description | GetIt | Field hidden if no data |
| Other Notes | N/A | Blank space for staff to write-in notes |

The second half of the workslip is a table showing the copies on order.

| Column | Data |
| :----: | :--: |
| Copies (GetIt: #, LINKcat: #) | Table Heading; First number in parenthesis afterward is the total number of GetIt items (i.e. the number of items that should print on workslip). Second number in parenthesis after that is the total number of items on the bib & will include the number of MPL/GetIt items. |
| Copy Location |  Pulls information from Copy - Loc column of Item table. All items should be listed, automatically in alphabetical order. For titles with more than 15 copies, receiver will have to adjust number of items in GetIt table by manually changing the page number [i.e. number of items on the screen] and then "scroll" a bit before attempting to print. Ask Tina for a demonstration. |
| Receipt Status | Prints if Expected ("Exp'd") or Received ("Rec'd") |
| Staff Note | Scraped from staff note field |

  [1]: https://chrome.google.com/webstore/detail/iaofdkhjgbkaappnmefocfheffceihlk
