export interface CSICode {
  id: string;
  code: string;
  title: string;
  subItems?: CSICode[];
}

export const csiCodes: CSICode[] = [
  {
    id: '01',
    code: '01',
    title: 'General Requirements',
    subItems: [
      { id: '01.1', code: '01.1', title: 'Temporary Toilets' },
      { id: '01.2', code: '01.2', title: 'Temporary Water' },
      { id: '01.3', code: '01.3', title: 'Temporary Fence' },
      { id: '01.4', code: '01.4', title: 'Temporary Electricity' },
      { id: '01.5', code: '01.5', title: 'Trash and Soil Offhaul' },
      { id: '01.6', code: '01.6', title: 'Insurance' },
    ],
  },
  {
    id: '02',
    code: '02',
    title: 'Existing Conditions',
    subItems: [
      { id: '02.1', code: '02.1', title: 'Site Survey' },
      { id: '02.2', code: '02.2', title: 'Demolition' },
      { id: '02.3', code: '02.3', title: 'Removal & Salvage of Construction Materials' },
    ],
  },
  {
    id: '03',
    code: '03',
    title: 'Concrete',
    subItems: [
      { id: '03.1', code: '03.1', title: 'Concrete Forming' },
      { id: '03.2', code: '03.2', title: 'Concrete Accessories' },
      { id: '03.3', code: '03.3', title: 'Concrete Reinforcing' },
      { id: '03.4', code: '03.4', title: 'Structural Concrete' },
      { id: '03.5', code: '03.5', title: 'Architectural Concrete' },
    ],
  },
  {
    id: '04',
    code: '04',
    title: 'Masonry',
    subItems: [
      { id: '04.1', code: '04.1', title: 'Concrete Masonry Unit (CMU)' },
      { id: '04.2', code: '04.2', title: 'Exterior Stone Cladding' },
      { id: '04.3', code: '04.3', title: 'Brick Masonry' },
    ],
  },
  {
    id: '05',
    code: '05',
    title: 'Metals',
    subItems: [
      { id: '05.1', code: '05.1', title: 'Structural Metal Framing' },
      { id: '05.2', code: '05.2', title: 'Metal Stairs' },
      { id: '05.3', code: '05.3', title: 'Metal Railings' },
      { id: '05.4', code: '05.4', title: 'Decorative Metal' },
      { id: '05.5', code: '05.5', title: 'Miscellaneous Metals' },
    ],
  },
  {
    id: '06',
    code: '06',
    title: 'Wood, Plastics and Composites',
    subItems: [
      { id: '06.1', code: '06.1', title: 'Rough Carpentry' },
      { id: '06.2', code: '06.2', title: 'Board Paneling' },
      { id: '06.3', code: '06.3', title: 'Wood Stairs' },
      { id: '06.4', code: '06.4', title: 'Composite Decking' },
      { id: '06.5', code: '06.5', title: 'Hardware' },
    ],
  },
  {
    id: '07',
    code: '07',
    title: 'Thermal and Moisture Protection',
    subItems: [
      { id: '07.1', code: '07.1', title: 'Below Grade Waterproofing' },
      { id: '07.2', code: '07.2', title: 'Exterior Insulation' },
      { id: '07.3', code: '07.3', title: 'Roofing' },
      { id: '07.4', code: '07.4', title: 'Siding Panels' },
      { id: '07.5', code: '07.5', title: 'Flashing and Sheet Metal' },
      { id: '07.6', code: '07.6', title: 'Roof Accessories' },
    ],
  },
  {
    id: '08',
    code: '08',
    title: 'Openings',
    subItems: [
      { id: '08.1', code: '08.1', title: 'Doors and Frames' },
      { id: '08.2', code: '08.2', title: 'Sliding Glass Doors' },
      { id: '08.3', code: '08.3', title: 'Windows' },
      { id: '08.4', code: '08.4', title: 'Roof Windows and Skylights' },
      { id: '08.5', code: '08.5', title: 'Hardware' },
      { id: '08.6', code: '08.6', title: 'Glazing' },
    ],
  },
  {
    id: '09',
    code: '09',
    title: 'Finishes',
    subItems: [
      { id: '09.1', code: '09.1', title: 'Plaster and Gypsum Board' },
      { id: '09.2', code: '09.2', title: 'Cement Plastering' },
      { id: '09.3', code: '09.3', title: 'Backing Boards and Underlayments' },
      { id: '09.4', code: '09.4', title: 'Tiling' },
      { id: '09.5', code: '09.5', title: 'Flooring' },
      { id: '09.6', code: '09.6', title: 'Painting and Coating' },
      { id: '09.7', code: '09.7', title: 'Baseboard and Crown Molding' },
    ],
  },
  {
    id: '10',
    code: '10',
    title: 'Specialties',
    subItems: [
      { id: '10.1', code: '10.1', title: 'Toilet, Bath, and Laundry Accessories' },
      { id: '10.2', code: '10.2', title: 'Fireplaces and Stoves' },
      { id: '10.3', code: '10.3', title: 'Storage Specialties' },
      { id: '10.4', code: '10.4', title: 'Wardrobe and Closet Specialties' },
      { id: '10.5', code: '10.5', title: 'Other Specialties' },
    ],
  },
  {
    id: '11',
    code: '11',
    title: 'Equipment',
    subItems: [
      { id: '11.1', code: '11.1', title: 'Unit Kitchens' },
      { id: '11.2', code: '11.2', title: 'Residential Appliances' },
      { id: '11.3', code: '11.3', title: 'Retractable Stairs' },
      { id: '11.4', code: '11.4', title: 'Residential Ceiling Fans' },
    ],
  },
  {
    id: '12',
    code: '12',
    title: 'Furnishings',
    subItems: [
      { id: '12.1', code: '12.1', title: 'Window Blinds' },
      { id: '12.2', code: '12.2', title: 'Window Shades' },
      { id: '12.3', code: '12.3', title: 'Casework' },
      { id: '12.4', code: '12.4', title: 'Countertops' },
      { id: '12.5', code: '12.5', title: 'Bath Furnishings' },
      { id: '12.6', code: '12.6', title: 'Bedroom Furnishings' },
    ],
  },
  {
    id: '14',
    code: '14',
    title: 'Conveying Equipment',
    subItems: [
      { id: '14.1', code: '14.1', title: 'Scaffolding' },
    ],
  },
  {
    id: '21',
    code: '21',
    title: 'Fire Suppression',
    subItems: [
      { id: '21.1', code: '21.1', title: 'Fire-Suppression Sprinkler Systems' },
    ],
  },
  {
    id: '22',
    code: '22',
    title: 'Plumbing',
    subItems: [
      { id: '22.1', code: '22.1', title: 'Facility Potable Domestic Water' },
      { id: '22.2', code: '22.2', title: 'Facility Storm Drainage' },
      { id: '22.3', code: '22.3', title: 'Facility Sanitary Sewerage' },
      { id: '22.4', code: '22.4', title: 'Plumbing Piping' },
      { id: '22.5', code: '22.5', title: 'Domestic Water Softeners' },
      { id: '22.6', code: '22.6', title: 'Domestic Water Filtration Equipment' },
      { id: '22.7', code: '22.7', title: 'Electric Domestic Water Heaters' },
      { id: '22.8', code: '22.8', title: 'Residential Plumbing Fixtures' },
    ],
  },
  {
    id: '23',
    code: '23',
    title: 'HVAC',
    subItems: [
      { id: '23.1', code: '23.1', title: 'HVAC Piping and Pumps' },
      { id: '23.2', code: '23.2', title: 'HVAC Ducts and Casings' },
      { id: '23.3', code: '23.3', title: 'Air Plenums and Chases' },
      { id: '23.4', code: '23.4', title: 'Central HVAC Equipment' },
    ],
  },
  {
    id: '26',
    code: '26',
    title: 'Electrical',
    subItems: [
      { id: '26.1', code: '26.1', title: 'Low-Voltage Electrical' },
      { id: '26.2', code: '26.2', title: 'Switchboards and Panelboards' },
      { id: '26.3', code: '26.3', title: 'Low-Voltage Equipment' },
      { id: '26.4', code: '26.4', title: 'Interior Lighting' },
      { id: '26.5', code: '26.5', title: 'Exterior Lighting' },
    ],
  },
  {
    id: '27',
    code: '27',
    title: 'Communications',
    subItems: [
      { id: '27.1', code: '27.1', title: 'Data Communications' },
    ],
  },
  {
    id: '28',
    code: '28',
    title: 'Electronic Safety and Security',
    subItems: [
      { id: '28.1', code: '28.1', title: 'Video Surveillance' },
    ],
  },
  {
    id: '31',
    code: '31',
    title: 'Earthwork',
    subItems: [
      { id: '31.1', code: '31.1', title: 'Site Clearing' },
      { id: '31.2', code: '31.2', title: 'Grading' },
      { id: '31.3', code: '31.3', title: 'Excavation and Fill' },
      { id: '31.4', code: '31.4', title: 'Soil Stabilization' },
    ],
  },
  {
    id: '32',
    code: '32',
    title: 'Exterior Improvements',
    subItems: [
      { id: '32.1', code: '32.1', title: 'Unit Paving' },
      { id: '32.2', code: '32.2', title: 'Curbs, Gutters, Sidewalks, and Driveways' },
      { id: '32.3', code: '32.3', title: 'Irrigation' },
      { id: '32.4', code: '32.4', title: 'Planting' },
    ],
  },
  {
    id: '33',
    code: '33',
    title: 'Utilities',
    subItems: [
      { id: '33.1', code: '33.1', title: 'Sanitary Sewerage Utilities' },
      { id: '33.2', code: '33.2', title: 'Storm Drainage Utilities' },
      { id: '33.3', code: '33.3', title: 'Natural-Gas Distribution' },
    ],
  },
];