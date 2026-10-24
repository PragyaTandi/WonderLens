import type { Topic } from './types';

const IMG = {
  treeCanopy: 'https://images.pexels.com/photos/38149495/pexels-photo-38149495.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  rainbow: 'https://images.pexels.com/photos/6134011/pexels-photo-6134011.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  circuit: 'https://images.pexels.com/photos/6477211/pexels-photo-6477211.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  prism: 'https://images.pexels.com/photos/32489613/pexels-photo-32489613.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  waterDroplet: 'https://images.pexels.com/photos/2516772/pexels-photo-2516772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  butterfly: 'https://images.pexels.com/photos/37108259/pexels-photo-37108259.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  clock: 'https://images.pexels.com/photos/16184220/pexels-photo-16184220.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  snowflake: 'https://images.pexels.com/photos/29636799/pexels-photo-29636799.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  gyroscope: 'https://images.pexels.com/photos/270949/pexels-photo-270949.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  nebula: 'https://images.pexels.com/photos/20881655/pexels-photo-20881655.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  brain: 'https://images.pexels.com/photos/4226139/pexels-photo-4226139.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  copper: 'https://images.pexels.com/photos/11133641/pexels-photo-11133641.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  neuralNet: 'https://images.pexels.com/photos/17483870/pexels-photo-17483870.png?auto=compress&cs=tinysrgb&h=650&w=940',
  lightning: 'https://images.pexels.com/photos/6235455/pexels-photo-6235455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  autumn: 'https://images.pexels.com/photos/40235466/pexels-photo-40235466.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  microscope: 'https://images.pexels.com/photos/8531343/pexels-photo-8531343.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  tuningFork: 'https://images.pexels.com/photos/6194031/pexels-photo-6194031.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  leafVeins: 'https://images.pexels.com/photos/2115085/pexels-photo-2115085.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const topics: Topic[] = [
  {
    id: 'tree-water',
    question: 'How does a tree move water from its roots to its leaves?',
    category: 'Nature',
    image: IMG.treeCanopy,
    imageAlt: 'Sunlight filtering through a dense tree canopy viewed from below.',
    caption: 'A 30-metre tree lifts hundreds of litres of water every day — without any moving parts.',
    shortAnswer:
      'Trees rely on the cohesion–tension theory: water evaporates from leaves, creating a negative pressure that pulls a continuous column of water up from the roots.',
    discovery: {
      imageCaption:
        'Cross-section concept: water travels through xylem vessels in an unbroken column from root to leaf, driven by evaporation at the surface.',
      introQuestion:
        'A tall tree has no pump. Yet water reaches the highest leaves. What force could pull water upward against gravity?',
      annotations: [
        { number: 1, label: 'Evaporation from leaf surfaces creates tension' },
        { number: 2, label: 'Water column held together by hydrogen bonds' },
        { number: 3, label: 'Negative pressure transmitted down to roots' },
      ],
      explanationSections: [
        {
          heading: 'The Problem',
          body: 'To raise water 30 metres, a pump would need to overcome roughly 3 atmospheres of gravitational pressure. Trees have no internal pump. So how does water reach the canopy?',
        },
        {
          heading: 'The Cohesion–Tension Theory',
          body: 'The answer lies in evaporation. Inside a leaf, water evaporates from the surfaces of mesophyll cells into the air spaces and exits through stomata. This loss of water creates a negative pressure — a tension — at the top of the xylem. Because water molecules cling to each other (cohesion) and to the xylem walls (adhesion), this tension is transmitted all the way down the column to the roots.',
        },
        {
          heading: 'Why the Column Does Not Break',
          body: 'Water molecules are held together by hydrogen bonds, giving the column a high tensile strength. The xylem vessels are extremely narrow, which keeps the water column stable and prevents cavitation. In this way the tree functions as a passive, solar-powered pump.',
        },
      ],
      factPanels: [
        { label: 'Max height', value: '≈ 120 m (redwoods)' },
        { label: 'Daily uptake', value: '200–400 L for a large tree' },
        { label: 'Key force', value: 'Negative pressure (tension)' },
        { label: 'Driving energy', value: 'Solar evaporation' },
      ],
      relatedDiscoveryIds: ['capillary-action', 'photosynthesis'],
      learningFlow: [
        { phase: 'Notice', question: 'When water evaporates from a surface, does it leave behind higher or lower pressure?', hint: 'Think about what happens when molecules leave a space.', answer: 'Lower pressure — molecules leave, so fewer push back. This creates a partial vacuum, or tension.' },
        { phase: 'Wonder', question: 'If evaporation creates tension at the top, could that tension pull water up from below?', answer: 'Yes — if the water molecules stay connected, the pull is transmitted down the entire column.' },
        { phase: 'Predict', question: 'What would happen to the water column if the xylem vessel were very wide?', hint: 'Consider how easily a wide rope breaks compared to a thin one.', answer: 'A wide column would cavitate — air bubbles would form and break the continuous column. Narrow vessels prevent this.' },
        { phase: 'Explore', question: 'If you sealed the stomata on a leaf, what would happen to water flow up the tree?', answer: 'Flow would stop — without evaporation there is no tension to pull water upward.' },
        { phase: 'Discover', question: 'The tree is a solar-powered suction pump. No energy is spent by the tree itself on lifting water. Where does the energy come from?', answer: 'The sun. Solar energy drives evaporation, which provides the tension. The tree is passive.' },
        { phase: 'Formalise', question: 'Can you state the cohesion–tension theory in one sentence?', answer: 'Evaporation from leaves creates negative pressure that pulls a continuous water column upward through the xylem, sustained by the cohesive hydrogen bonds between water molecules.' },
        { phase: 'Apply', question: 'A drought causes cavitation in a tree\'s xylem. Why might the tree struggle to recover even after rain returns?', answer: 'Once an air bubble (embolism) forms in a xylem vessel, the water column is broken and tension can no longer be transmitted through that vessel. Recovery requires refilling, which is difficult and energy-intensive.' },
      ],
    },
  },
  {
    id: 'rainbow',
    question: 'What makes a rainbow appear?',
    category: 'Light & Sound',
    image: IMG.rainbow,
    imageAlt: 'A rainbow arcing over a serene sky with soft clouds.',
    caption: 'Each raindrop acts as a tiny prism, bending sunlight into its component colours.',
    shortAnswer:
      'Sunlight enters a raindrop, refracts, reflects off the inner surface, and refracts again as it exits — separating white light into a spectrum.',
    discovery: {
      imageCaption:
        'Light path through a raindrop: refraction, internal reflection, and a second refraction separate white light into visible colours.',
      introQuestion: 'You see a rainbow only when the sun is behind you and rain is ahead. Why this specific geometry?',
      annotations: [
        { number: 1, label: 'Light enters, refracts (slows down in water)' },
        { number: 2, label: 'Reflects off inner surface' },
        { number: 3, label: 'Refracts again on exit — colours separate' },
      ],
      explanationSections: [
        {
          heading: 'The Geometry',
          body: 'A rainbow appears when sunlight hits roughly spherical raindrops at a specific angle. Each colour bends by a slightly different amount because refractive index varies with wavelength — red bends least, violet bends most. The result is a focused band of colour at about 42 degrees from the direction opposite the sun.',
        },
        {
          heading: 'One Drop, One Colour',
          body: 'Each raindrop sends only one colour toward your eye. You see a rainbow because millions of drops at different heights each contribute a different colour to the overall arc. Someone standing next to you sees a slightly different rainbow from a different set of drops.',
        },
        {
          heading: 'Secondary Rainbows',
          body: 'When light reflects twice inside a drop, a fainter secondary rainbow forms outside the primary arc, with colours reversed. The dark band between the two arcs is called Alexander\'s band — an area where light is redirected away from the viewer.',
        },
      ],
      factPanels: [
        { label: 'Angle', value: '~42° from antisolar point' },
        { label: 'Colours', value: 'Red, orange, yellow, green, blue, indigo, violet' },
        { label: 'Secondary arc', value: '~51°, reversed colours' },
        { label: 'Each drop', value: 'Sends one colour to your eye' },
      ],
      equation: { expression: 'n₁ sin θ₁ = n₂ sin θ₂', description: "Snell's Law: the angle of refraction depends on the refractive indices of two media." },
      relatedDiscoveryIds: ['prism', 'light-spectrum'],
      learningFlow: [
        { phase: 'Notice', question: 'Have you noticed that rainbows only appear when the sun is low in the sky and rain is in front of you?', answer: 'Yes — the geometry requires the sun behind you and rain ahead, at about 42 degrees.' },
        { phase: 'Wonder', question: 'White light goes into the raindrop. Coloured light comes out. What happened inside?', answer: 'The light was bent (refracted), and different colours bent by different amounts.' },
        { phase: 'Predict', question: 'If red bends the least and violet the most, which colour appears on the outside of the rainbow?', answer: 'Red is on the outside (top) of the arc because it bends least, arriving from drops higher in the sky.' },
        { phase: 'Explore', question: 'Would you see the same rainbow as someone standing a few metres away?', answer: 'No. Each person sees a rainbow made of different raindrops — it is a personal optical phenomenon.' },
        { phase: 'Discover', question: 'Why are rainbows always circular arcs?', answer: 'The 42-degree angle creates a cone of light around the antisolar point. The ground cuts off the bottom, leaving an arc.' },
        { phase: 'Formalise', question: 'State the relationship between refraction angle and wavelength.', answer: "Shorter wavelengths (violet) refract more than longer wavelengths (red), so each colour exits the drop at a slightly different angle." },
        { phase: 'Apply', question: 'Can a rainbow exist on Mars where rain does not fall?', answer: 'Not from rain, but ice crystals or suspended droplets can create similar optical phenomena. Mars rovers have observed faint optical arcs caused by ice particles.' },
      ],
    },
  },
  {
    id: 'binary-search',
    question: 'How can binary search find an element so quickly?',
    category: 'Computer Science' as any,
    image: IMG.circuit,
    imageAlt: 'Close-up of a circuit board showing detailed connections and components.',
    caption: 'Each comparison eliminates half the remaining candidates. After 20 steps you can search a million items.',
    shortAnswer:
      'Binary search halves the search space at each step by comparing the target to the middle element of a sorted array, giving O(log n) time.',
    discovery: {
      imageCaption:
        'A sorted array with the target compared to the middle element. Each step discards the half that cannot contain the target.',
      introQuestion:
        'You have a phone book with a million names. How many pages do you need to open to find a specific person?',
      annotations: [
        { number: 1, label: 'Compare target to the middle element' },
        { number: 2, label: 'Eliminate the half that cannot contain the target' },
        { number: 3, label: 'Repeat on the remaining half' },
      ],
      explanationSections: [
        {
          heading: 'The Intuition',
          body: 'Imagine searching for a name in a phone book. You open it roughly in the middle. If the name comes before that page alphabetically, you ignore the right half entirely. You have halved the search space with a single comparison.',
        },
        {
          heading: 'The Algorithm',
          body: 'Given a sorted array, compare the target to the middle element. If equal, you are done. If the target is smaller, repeat on the left half. If larger, repeat on the right half. Each step halves the remaining elements.',
        },
        {
          heading: 'Why It Is Fast',
          body: 'After one step, 1,000,000 becomes 500,000. After two, 250,000. After 20 steps, only 1 element remains. This is logarithmic growth: O(log₂ n). For a billion elements, you need only about 30 comparisons.',
        },
      ],
      factPanels: [
        { label: 'Time complexity', value: 'O(log n)' },
        { label: 'Precondition', value: 'Array must be sorted' },
        { label: '1 million items', value: '~20 comparisons' },
        { label: '1 billion items', value: '~30 comparisons' },
      ],
      equation: { expression: 'comparisons = ⌈log₂ n⌉', description: 'Number of comparisons needed for an array of size n.' },
      relatedDiscoveryIds: ['recursion', 'sorting'],
      learningFlow: [
        { phase: 'Notice', question: 'If you look up a word in a dictionary, do you read every page from the start?', answer: 'No — you open somewhere near the middle and narrow down.' },
        { phase: 'Wonder', question: 'What is the most efficient way to eliminate candidates in a sorted list?', answer: 'Compare the target to the middle element — this discards half the list at once.' },
        { phase: 'Predict', question: 'How many steps to search 16 sorted elements? 32?', hint: 'Each step halves the remaining elements.', answer: '4 steps for 16, 5 for 32 — each doubling of size adds just one step.' },
        { phase: 'Explore', question: 'What happens if the array is not sorted?', answer: 'Binary search fails — you cannot assume the target is on one side. You must use linear search (O(n)).' },
        { phase: 'Discover', question: 'After k steps, how many elements remain?', answer: 'n / 2^k. The search ends when n / 2^k = 1, so k = log₂ n.' },
        { phase: 'Formalise', question: 'Express the time complexity in big-O notation.', answer: 'O(log n) — logarithmic time, because the search space halves at each step.' },
        { phase: 'Apply', question: 'A database has 10 billion rows, sorted by ID. Why is binary search still impractical for direct lookups?', answer: 'Binary search requires random access to the middle element. In a database stored on disk, seeking to an arbitrary position is expensive, so B-trees are used instead — a generalisation of binary search for block-based storage.' },
      ],
    },
  },
  {
    id: 'prism',
    question: 'Why does a prism split white light into colours?',
    category: 'Light & Sound',
    image: IMG.prism,
    imageAlt: 'Light dispersing through a crystal prism creating a rainbow spectrum.',
    caption: 'Different wavelengths travel at different speeds in glass, bending by different amounts.',
    shortAnswer:
      'Each colour of light has a different wavelength and refractive index in glass. The prism bends each wavelength by a different angle, spreading white light into a spectrum.',
    discovery: {
      imageCaption:
        'Dispersion: white light enters the prism, refracts at the first surface, refracts again at the second, and separates into visible colours.',
      introQuestion: 'A prism turns white light into a rainbow. Why does glass separate colours that air does not?',
      annotations: [
        { number: 1, label: 'White light enters, refracts at air-glass boundary' },
        { number: 2, label: 'Each wavelength bends by a different amount' },
        { number: 3, label: 'Colours spread apart as they exit' },
      ],
      explanationSections: [
        {
          heading: 'Refractive Index and Wavelength',
          body: 'In a vacuum, all wavelengths travel at the same speed. In glass, they slow down — but by different amounts. Violet light (shorter wavelength) slows more and bends more. Red light (longer wavelength) slows less and bends less. This wavelength-dependent bending is called dispersion.',
        },
        {
          heading: 'Why a Prism and Not a Flat Sheet',
          body: 'A flat sheet of glass has parallel sides, so the bending at entry is undone at exit. A prism has non-parallel surfaces: the second refraction reinforces the angular separation instead of cancelling it. The result is a visible spectrum.',
        },
        {
          heading: 'Newton\'s Discovery',
          body: 'Isaac Newton first demonstrated that white light is a mixture of all colours. He passed sunlight through a prism, split it into a spectrum, then passed one colour through a second prism — it did not split further. This proved the colours were components of white light, not created by the prism.',
        },
      ],
      factPanels: [
        { label: 'Shortest wavelength', value: 'Violet (~380 nm)' },
        { label: 'Longest wavelength', value: 'Red (~700 nm)' },
        { label: 'Phenomenon', value: 'Dispersion' },
        { label: 'Key variable', value: 'Refractive index depends on wavelength' },
      ],
      equation: { expression: 'n(λ) = c / v(λ)', description: 'Refractive index n depends on wavelength λ because the speed of light v in the medium varies with wavelength.' },
      relatedDiscoveryIds: ['rainbow', 'light-spectrum'],
      learningFlow: [
        { phase: 'Notice', question: 'White light goes into a prism, colours come out. Where did the colours come from?', answer: 'They were always in the white light — the prism separates them.' },
        { phase: 'Wonder', question: 'Why does violet bend more than red?', answer: 'Violet has a shorter wavelength and interacts more strongly with the glass, slowing more and bending more.' },
        { phase: 'Predict', question: 'Would a prism work in a vacuum?', answer: 'No — a prism needs a material medium where different wavelengths travel at different speeds. In vacuum, all wavelengths travel at c.' },
        { phase: 'Explore', question: 'What would happen with two prisms arranged to recombine the light?', answer: 'The colours would recombine back into white light — Newton demonstrated this.' },
        { phase: 'Discover', question: 'The prism does not create colour. What does it actually do?', answer: 'It separates existing wavelengths by bending each by a different angle, making the spectrum visible.' },
        { phase: 'Formalise', question: 'Define dispersion.', answer: 'Dispersion is the dependence of refractive index on wavelength, causing different colours to refract by different angles.' },
        { phase: 'Apply', question: 'Why are telescope lenses made of multiple glass elements of different types?', answer: 'Different glasses have different dispersion curves. Combining them cancels out chromatic aberration — the unwanted colour separation that a single lens would introduce.' },
      ],
    },
  },
  {
    id: 'conduction',
    question: 'Why do some materials conduct electricity?',
    category: 'Materials',
    image: IMG.copper,
    imageAlt: 'Close-up of copper wires showing metallic texture.',
    caption: 'In metals, electrons move freely. In insulators, they are locked in place.',
    shortAnswer:
      'Conductors have free electrons that can drift through the material when a voltage is applied. Insulators hold electrons tightly in bonds, preventing flow.',
    discovery: {
      imageCaption:
        'Band structure comparison: in a conductor, the valence and conduction bands overlap, giving free electrons. In an insulator, a band gap prevents electron movement.',
      introQuestion: 'A copper wire and a plastic coating carry the same electrons. Why does only the copper let current through?',
      annotations: [
        { number: 1, label: 'Conductor: overlapping bands, free electrons' },
        { number: 2, label: 'Insulator: band gap blocks electron flow' },
        { number: 3, label: 'Semiconductor: small gap, conductive when energised' },
      ],
      explanationSections: [
        {
          heading: 'The Band Theory',
          body: 'In solids, electron energy levels merge into bands. The highest occupied band is the valence band; the next one up is the conduction band. If these overlap (as in metals), electrons move freely and the material conducts. If a gap separates them (as in insulators), electrons cannot move and the material blocks current.',
        },
        {
          heading: 'Free Electrons in Metals',
          body: 'In a copper atom, the outermost electron is weakly bound. In solid copper, these electrons delocalise — they leave their atoms and form a sea of mobile electrons. When a voltage is applied, this sea drifts, creating electric current.',
        },
        {
          heading: 'Semiconductors: The Middle Ground',
          body: 'Silicon has a small band gap. At absolute zero it is an insulator. At room temperature, thermal energy is enough to excite some electrons across the gap, giving modest conductivity. Doping with impurities can dramatically increase this — the basis of all modern electronics.',
        },
      ],
      factPanels: [
        { label: 'Copper resistivity', value: '1.7 × 10⁻⁸ Ω·m' },
        { label: 'Glass resistivity', value: '~10¹² Ω·m' },
        { label: 'Ratio', value: 'Insulator is ~10²⁰× more resistive' },
        { label: 'Free electrons per Cu atom', value: '1' },
      ],
      equation: { expression: 'σ = n·e·μ', description: 'Conductivity σ depends on charge carrier density n, electron charge e, and mobility μ.' },
      relatedDiscoveryIds: ['semiconductors', 'superconductors'],
      learningFlow: [
        { phase: 'Notice', question: 'Some materials feel cold to touch (metals), others do not (wood). Why?', answer: 'Metals have free electrons that transfer heat rapidly to your skin. Wood lacks free electrons.' },
        { phase: 'Wonder', question: 'What allows electrons to move in a metal but not in plastic?', answer: 'In metals, outer electrons are delocalised. In plastics, all electrons are bound in covalent bonds.' },
        { phase: 'Predict', question: 'If you heat a semiconductor, does its conductivity increase or decrease?', answer: 'Increase — thermal energy excites more electrons across the band gap, creating more charge carriers.' },
        { phase: 'Explore', question: 'Why does heating a metal decrease its conductivity?', answer: 'More thermal vibrations scatter the free electrons, reducing their mobility. Conductors and semiconductors respond oppositely to temperature.' },
        { phase: 'Discover', question: 'What is the fundamental difference between a conductor and an insulator at the atomic level?', answer: 'Whether the valence and conduction bands overlap (conductor) or are separated by a band gap (insulator).' },
        { phase: 'Formalise', question: 'State the relationship between conductivity and band structure.', answer: 'A material conducts if its conduction band is partially occupied or overlaps with the valence band. A band gap prevents conduction.' },
        { phase: 'Apply', question: 'Why are power lines made of aluminium, not copper, despite copper being more conductive?', answer: 'Aluminium is lighter and cheaper. Its conductivity is 60% of copper but its weight-to-conductivity ratio is better for long spans, and cost is far lower.' },
      ],
    },
  },
  {
    id: 'derivative',
    question: 'What does a derivative actually measure?',
    category: 'Mathematics' as any,
    image: IMG.autumn,
    imageAlt: 'Autumn fern leaves against a dark background.',
    caption: 'A derivative is not about change in general — it is the instantaneous rate of change at a single point.',
    shortAnswer:
      'The derivative measures the slope of a function at a point — the rate of change at that exact instant, found as the limit of average rate over shrinking intervals.',
    discovery: {
      imageCaption:
        'The tangent line at a point on a curve: its slope is the derivative, the instantaneous rate of change.',
      introQuestion: 'A car\'s speedometer reads 60 km/h at a single instant. How can speed exist at one moment when speed is distance over time?',
      annotations: [
        { number: 1, label: 'Secant line: average rate over an interval' },
        { number: 2, label: 'As the interval shrinks, secant approaches tangent' },
        { number: 3, label: 'Tangent slope = derivative at the point' },
      ],
      explanationSections: [
        {
          heading: 'From Average to Instantaneous',
          body: 'Average speed is distance divided by time — it describes an interval. But a speedometer shows a single number at a single moment. The derivative resolves this paradox: it is the limit of average speed as the time interval shrinks to zero.',
        },
        {
          heading: 'The Tangent Line',
          body: 'Geometrically, the derivative is the slope of the tangent line at a point on the curve. The tangent is the limit of secant lines: as the two points get closer together, the secant line through them approaches the tangent at the single point.',
        },
        {
          heading: 'Why It Matters',
          body: 'Derivatives describe rates of change everywhere in science: velocity is the derivative of position, acceleration is the derivative of velocity, marginal cost is the derivative of total cost, reaction rate is the derivative of concentration. Wherever something changes continuously, the derivative describes how.',
        },
      ],
      factPanels: [
        { label: 'Definition', value: 'Limit of average rate as interval → 0' },
        { label: 'Geometric meaning', value: 'Slope of the tangent line' },
        { label: 'Notation', value: 'f′(x), dy/dx, or ḟ' },
        { label: 'Key application', value: 'Velocity, growth, optimisation' },
      ],
      equation: { expression: "f'(a) = lim_{h→0} [f(a+h) − f(a)] / h", description: 'The derivative of f at point a is the limit of the difference quotient as h approaches zero.' },
      relatedDiscoveryIds: ['integration', 'optimisation'],
      learningFlow: [
        { phase: 'Notice', question: 'When driving, your speedometer shows a single number. What is it measuring?', answer: 'Instantaneous speed — the rate of change of position at that exact moment.' },
        { phase: 'Wonder', question: 'How can you have a rate at a single instant when rate needs an interval?', answer: 'By taking the limit of the average rate as the interval shrinks to zero.' },
        { phase: 'Predict', question: 'If a curve is flat at a point, what is its derivative there?', answer: 'Zero — a flat tangent has zero slope, meaning the function is not changing at that point.' },
        { phase: 'Explore', question: 'If position is s(t) = t², what is the velocity at t = 3?', hint: 'Compute the difference quotient and take the limit.', answer: 's′(t) = 2t, so velocity at t = 3 is 6 units/s.' },
        { phase: 'Discover', question: 'The derivative of position is velocity. What is the derivative of velocity?', answer: 'Acceleration. Each derivative is the rate of change of the previous quantity.' },
        { phase: 'Formalise', question: 'Write the formal definition of the derivative as a limit.', answer: "f'(a) = lim_{h→0} [f(a+h) − f(a)] / h" },
        { phase: 'Apply', question: 'A company\'s profit function has a derivative of zero at a certain production level. What does this mean?', answer: 'At that point, profit is neither increasing nor decreasing — it is at a maximum or minimum. This is how derivatives are used to find optimal solutions.' },
      ],
    },
  },
  {
    id: 'gyroscope',
    question: 'Why does a spinning object behave differently when tilted?',
    category: 'Physics',
    image: IMG.gyroscope,
    imageAlt: 'A colourful spinning top captured in motion.',
    caption: 'A spinning gyroscope resists changes to its axis of rotation — the basis of navigation.',
    shortAnswer:
      'Angular momentum is a vector. A spinning object resists changes to its rotation axis due to the conservation of angular momentum, producing precession when torque is applied.',
    discovery: {
      imageCaption:
        'Precession: when gravity applies torque to a spinning gyroscope, the rotation axis traces a cone rather than falling.',
      introQuestion: 'A spinning top stays upright, but a non-spinning top falls immediately. What does the spinning change?',
      annotations: [
        { number: 1, label: 'Angular momentum vector along the spin axis' },
        { number: 2, label: 'Gravity applies torque perpendicular to spin' },
        { number: 3, label: 'Result: precession, not falling' },
      ],
      explanationSections: [
        {
          heading: 'Angular Momentum',
          body: 'A spinning object has angular momentum — a vector quantity pointing along the rotation axis. The faster the spin and the more massive the object, the greater the angular momentum. Like linear momentum, it is conserved unless an external torque acts.',
        },
        {
          heading: 'Why It Does Not Fall',
          body: 'Gravity pulls the top\'s centre of mass downward, creating a torque. But torque on a spinning body does not tip it over — instead, it changes the direction of the angular momentum vector. The axis traces a cone (precession) rather than falling. This is the same principle that keeps a bicycle stable when moving.',
        },
        {
          heading: 'Applications',
          body: 'Gyroscopes in inertial navigation systems maintain a fixed orientation regardless of vehicle motion. They are used in spacecraft, aircraft, and smartphones. The Hubble Space Telescope uses gyroscopes to point precisely at distant stars for long exposures.',
        },
      ],
      factPanels: [
        { label: 'Key quantity', value: 'Angular momentum L = Iω' },
        { label: 'Precession rate', value: 'Ω = τ / (Iω)' },
        { label: 'Conservation', value: 'L is constant without external torque' },
        { label: 'Use case', value: 'Inertial navigation, stabilisation' },
      ],
      equation: { expression: 'τ = dL/dt', description: 'Torque equals the rate of change of angular momentum. When torque is perpendicular to L, it rotates L instead of changing its magnitude.' },
      relatedDiscoveryIds: ['angular-momentum', 'coriolis'],
      learningFlow: [
        { phase: 'Notice', question: 'A spinning top stays up. The same top, not spinning, falls. What is different?', answer: 'The spinning top has angular momentum — a vector that resists changes to its direction.' },
        { phase: 'Wonder', question: 'If gravity pulls down on the spinning top, why does it not fall?', answer: 'Gravity creates torque, but torque on a spinning body changes the direction of angular momentum, causing precession instead of falling.' },
        { phase: 'Predict', question: 'If you spin the top faster, will it precess faster or slower?', answer: 'Slower — precession rate Ω = τ/(Iω), so higher spin ω means slower precession.' },
        { phase: 'Explore', question: 'What happens if you try to tilt a spinning bicycle wheel by its axle?', answer: 'It resists tilting and instead rotates sideways — the torque you apply causes precession, not a direct tilt.' },
        { phase: 'Discover', question: 'Why do spacecraft use gyroscopes instead of thrusters for fine pointing?', answer: 'Gyroscopes provide torque without consuming fuel and allow precise, repeatable orientation control in the vacuum of space.' },
        { phase: 'Formalise', question: 'State the relationship between torque and angular momentum.', answer: 'τ = dL/dt — torque equals the rate of change of angular momentum. When τ is perpendicular to L, it rotates L (precession) rather than changing its magnitude.' },
        { phase: 'Apply', question: 'Why does a rolling coin stay upright longer than a stationary one?', answer: 'Rolling gives the coin angular momentum that resists tipping, just like a spinning top. As it slows, angular momentum decreases, and it falls sooner.' },
      ],
    },
  },
  {
    id: 'neural-network',
    question: 'How does a neural network learn a pattern?',
    category: 'Artificial Intelligence' as any,
    image: IMG.neuralNet,
    imageAlt: 'Abstract visualisation of a neural network with interconnected nodes.',
    caption: 'A network adjusts the strength of its connections — weights — by minimising prediction error.',
    shortAnswer:
      'A neural network learns by making predictions, measuring the error, and adjusting weights via backpropagation to reduce that error on the next attempt.',
    discovery: {
      imageCaption:
        'A feed-forward network: input layer receives data, hidden layers extract features, output layer produces a prediction. Weights between neurons are adjusted during training.',
      introQuestion: 'Show a child ten pictures of cats and they recognise cats. A neural network needs thousands. What is it doing differently?',
      annotations: [
        { number: 1, label: 'Forward pass: data flows from input to output' },
        { number: 2, label: 'Loss: compare prediction to correct answer' },
        { number: 3, label: 'Backpropagation: adjust weights to reduce loss' },
      ],
      explanationSections: [
        {
          heading: 'The Building Block: The Neuron',
          body: 'A neuron takes multiple inputs, multiplies each by a weight, sums them, and passes the result through a non-linear activation function. The weights determine how much each input matters. A network is many such neurons arranged in layers.',
        },
        {
          heading: 'Learning by Error',
          body: 'Training works in cycles. First, the network makes a prediction (forward pass). Then the loss function measures how wrong it is. Backpropagation calculates how each weight contributed to the error, and gradient descent nudges each weight slightly to reduce the loss next time. Over thousands of cycles, the weights converge to values that produce correct predictions.',
        },
        {
          heading: 'Why Non-Linearity Matters',
          body: 'Without non-linear activation functions, a network of any depth would behave identically to a single linear layer — it could only learn linear patterns. Non-linearities like ReLU allow the network to approximate any continuous function, given enough neurons.',
        },
      ],
      factPanels: [
        { label: 'Training loop', value: 'Forward → loss → backprop → update' },
        { label: 'Key algorithm', value: 'Gradient descent' },
        { label: 'Learning rate', value: 'Step size for weight updates' },
        { label: 'Universal approximation', value: 'Can approximate any continuous function' },
      ],
      equation: { expression: 'w_new = w_old − η · ∂L/∂w', description: 'Weight update rule: each weight is adjusted by the learning rate η times the gradient of the loss L with respect to that weight.' },
      relatedDiscoveryIds: ['gradient-descent', 'backpropagation'],
      learningFlow: [
        { phase: 'Notice', question: 'How do you learn to recognise a new face — by studying features or by seeing many examples?', answer: 'Mostly by seeing examples. You adjust your internal understanding with each new example.' },
        { phase: 'Wonder', question: 'A neural network starts with random weights. How does it become useful?', answer: 'By repeatedly making predictions, measuring error, and adjusting weights to reduce that error.' },
        { phase: 'Predict', question: 'If the learning rate is too large, what happens?', answer: 'The network overshoots the optimal weights and may fail to converge — it bounces around the minimum.' },
        { phase: 'Explore', question: 'Why does a network need non-linear activation functions?', answer: 'Without them, stacking layers is mathematically equivalent to a single linear layer, and the network can only learn linear relationships.' },
        { phase: 'Discover', question: 'What is the network actually learning?', answer: 'The weights — the strength of connections between neurons. These weights encode the pattern in numerical form.' },
        { phase: 'Formalise', question: 'Write the weight update rule.', answer: 'w_new = w_old − η · ∂L/∂w — each weight is adjusted opposite to the gradient of the loss, scaled by the learning rate.' },
        { phase: 'Apply', question: 'Why do large language models require so much training data?', answer: 'Each weight must be tuned through many examples. The loss landscape is high-dimensional, and sufficient data is needed to find weights that generalise rather than memorise the training set.' },
      ],
    },
  },
  {
    id: 'water-droplet',
    question: 'Why does water form perfect droplets on a leaf?',
    category: 'Nature',
    image: IMG.waterDroplet,
    imageAlt: 'A single water droplet on the tip of a leaf.',
    caption: 'Surface tension pulls water molecules inward, forming the shape with the smallest surface area: a sphere.',
    shortAnswer:
      'Water molecules attract each other (cohesion), and the surface molecules are pulled inward. This surface tension minimises surface area, producing near-spherical droplets.',
    discovery: {
      imageCaption:
        'Surface tension: molecules at the surface experience a net inward pull, contracting the surface to the smallest possible area.',
      introQuestion: 'Why are raindrops round, not flat or square? What force sculpts them?',
      annotations: [
        { number: 1, label: 'Interior molecules: pulled equally in all directions' },
        { number: 2, label: 'Surface molecules: net inward pull' },
        { number: 3, label: 'Result: surface contracts to minimise area' },
      ],
      explanationSections: [
        {
          heading: 'Cohesion and Surface Tension',
          body: 'Water molecules are polar — they attract each other through hydrogen bonds. A molecule inside a droplet is pulled equally in all directions. But a molecule on the surface has no water above it, so it feels a net inward pull. This contracts the surface, and the shape with minimum surface area for a given volume is a sphere.',
        },
        {
          heading: 'Contact Angles',
          body: 'On a hydrophobic surface like a waxy leaf, water does not spread — it beads up. The contact angle between the droplet and the surface is large because the water-water attraction (cohesion) exceeds the water-surface attraction (adhesion). On a hydrophilic surface like clean glass, water spreads flat because adhesion exceeds cohesion.',
        },
        {
          heading: 'The Lotus Effect',
          body: 'Lotus leaves have microscopic bumps coated in wax, creating a superhydrophobic surface. Water droplets roll off entirely, picking up dirt as they go — the leaf cleans itself. This principle is now used in self-cleaning paints and water-repellent textiles.',
        },
      ],
      factPanels: [
        { label: 'Surface tension of water', value: '72.8 mN/m at 20°C' },
        { label: 'Shape', value: 'Sphere (minimises surface area)' },
        { label: 'Leaf surface', value: 'Hydrophobic (contact angle > 90°)' },
        { label: 'Lotus contact angle', value: '> 150° (superhydrophobic)' },
      ],
      equation: { expression: 'γ = F / L', description: 'Surface tension γ is the force F per unit length L along the surface. It has units of N/m.' },
      relatedDiscoveryIds: ['capillary-action', 'tree-water'],
      learningFlow: [
        { phase: 'Notice', question: 'Why do water drops on a waxy leaf bead up, but spread flat on clean glass?', answer: 'The leaf is hydrophobic — water-water attraction exceeds water-leaf attraction, so water pulls together.' },
        { phase: 'Wonder', question: 'What force makes the surface of water behave like a stretched membrane?', answer: 'Surface tension — surface molecules experience a net inward pull from the molecules below and beside them.' },
        { phase: 'Predict', question: 'If you add soap to water, what happens to surface tension?', answer: 'It decreases. Soap molecules disrupt the hydrogen bonds at the surface, lowering surface tension and allowing water to spread.' },
        { phase: 'Explore', question: 'Why are small insects able to walk on water?', answer: 'Their weight is small enough that surface tension supports them — the surface does not break under their weight.' },
        { phase: 'Discover', question: 'What shape does a droplet want to be, and why?', answer: 'A sphere — it has the smallest surface area for a given volume, minimising the energy of the stretched surface.' },
        { phase: 'Formalise', question: 'Define surface tension and state why it produces spherical droplets.', answer: 'Surface tension is the inward force per unit length on a liquid surface. It contracts the surface to minimum area, and the minimum-area shape for a given volume is a sphere.' },
        { phase: 'Apply', question: 'How do self-cleaning surfaces like lotus leaves work?', answer: 'Superhydrophobic micro-structures create very high contact angles. Droplets bead up almost perfectly spherical, roll off easily, and carry dirt with them — the leaf cleans itself.' },
      ],
    },
  },
  {
    id: 'butterfly-wing',
    question: 'Why are butterfly wings so colourful?',
    category: 'Nature',
    image: IMG.butterfly,
    imageAlt: 'Macro shot of a butterfly showing wing detail.',
    caption: 'Most butterfly colours come not from pigments but from nanostructures that bend light.',
    shortAnswer:
      'Butterfly wing colours come from structural colour — microscopic scales that interfere with specific wavelengths of light, producing iridescent colours without pigment.',
    discovery: {
      imageCaption:
        'Wing scales: nanoscale ridges on each scale create thin-film interference, reflecting specific wavelengths while cancelling others.',
      introQuestion: 'A butterfly wing loses its colour when wet. But pigment does not wash off. What does this tell you?',
      annotations: [
        { number: 1, label: 'Scales arranged like roof tiles' },
        { number: 2, label: 'Nanoscale ridges create interference' },
        { number: 3, label: 'Specific wavelengths reflected, others cancelled' },
      ],
      explanationSections: [
        {
          heading: 'Structural Colour',
          body: 'A butterfly wing is covered in thousands of tiny scales, each about 0.1 mm long. The scales contain nanoscale ridges and air gaps spaced at the scale of visible light wavelengths. When light hits these structures, some wavelengths interfere constructively (bright) and others destructively (dark), producing vivid colour without any pigment.',
        },
        {
          heading: 'Why It Changes with Angle',
          body: 'Unlike pigment colour, which is the same from any angle, structural colour shifts as the viewing angle changes. This iridescence happens because the interference pattern depends on the angle of incoming and reflected light. A Morpho butterfly appears blue from one angle and nearly black from another.',
        },
        {
          heading: 'Pigment vs. Structure',
          body: 'Some butterfly colours are pigments (melanin for browns and blacks, pteridines for reds and yellows). But the brilliant blues, greens, and iridescent colours are structural. The clue: when a pigmented wing is wet, colour stays. When a structurally coloured wing is wet, water fills the air gaps, changing the refractive index and killing the interference — the colour fades.',
        },
      ],
      factPanels: [
        { label: 'Scale size', value: '~0.1 mm each' },
        { label: 'Ridge spacing', value: '~200–700 nm (visible light scale)' },
        { label: 'Mechanism', value: 'Thin-film interference' },
        { label: 'Morpho blue', value: 'Pure structural, no blue pigment' },
      ],
      relatedDiscoveryIds: ['prism', 'rainbow'],
      learningFlow: [
        { phase: 'Notice', question: 'A Morpho butterfly looks blue. But there is no blue pigment in its wing. Where does the colour come from?', answer: 'From nanoscale structures that reflect blue light through interference.' },
        { phase: 'Wonder', question: 'If the blue is not pigment, why does wetting the wing make it look dull?', answer: 'Water fills the nanoscale air gaps, changing the refractive index. The interference pattern that created the blue no longer works.' },
        { phase: 'Predict', question: 'Would the wing look the same colour from every angle?', answer: 'No — structural colour is iridescent. The interference depends on angle, so colour shifts as the wing moves.' },
        { phase: 'Explore', question: 'How do nanoscale ridges produce a single colour?', answer: 'The ridge spacing matches a specific wavelength. That wavelength interferes constructively (reflects), others interfere destructively (are absorbed).' },
        { phase: 'Discover', question: 'Why is structural colour useful for butterflies?', answer: 'It can produce very bright, pure colours with minimal material, and the angle-dependence can create flashing signals visible from a distance for mating or warning.' },
        { phase: 'Formalise', question: 'Explain the difference between pigment colour and structural colour.', answer: 'Pigment colour comes from molecules that absorb certain wavelengths. Structural colour comes from physical structures that interfere with light — reflecting specific wavelengths and cancelling others.' },
        { phase: 'Apply', question: 'How are butterfly-wing structures inspiring new technologies?', answer: 'Structural colour does not fade like pigment. Engineers are copying butterfly wing nanostructures to create colour displays, anti-counterfeiting features, and energy-efficient reflective screens that need no backlight.' },
      ],
    },
  },
  {
    id: 'clock-mechanism',
    question: 'How does a mechanical clock keep time?',
    category: 'Everyday Objects',
    image: IMG.clock,
    imageAlt: 'Close-up of a vintage clock mechanism showing intricate gears.',
    caption: 'A clock is an energy regulator: a spring stores energy, a pendulum releases it in equal beats.',
    shortAnswer:
      'A mechanical clock uses an escapement mechanism to release energy from a wound spring in equal, precisely-timed increments regulated by an oscillator (pendulum or balance wheel).',
    discovery: {
      imageCaption:
        'The escapement: the escape wheel is driven by the mainspring, but the pallets attached to the pendulum allow only one tooth to pass per oscillation — dividing energy into equal beats.',
      introQuestion: 'A wound spring wants to release all its energy at once. How does a clock turn that into hours of precise, equal ticks?',
      annotations: [
        { number: 1, label: 'Mainspring stores potential energy' },
        { number: 2, label: 'Escapement releases one tooth per swing' },
        { number: 3, label: 'Pendulum or balance wheel sets the beat' },
      ],
      explanationSections: [
        {
          heading: 'Energy Storage and Release',
          body: 'The mainspring, wound tight, stores potential energy. Without regulation, it would unwind in seconds. The escapement is the key: it allows the gear train to advance by exactly one tooth for each oscillation of the pendulum, converting a burst of energy into a series of equal, small steps.',
        },
        {
          heading: 'The Oscillator',
          body: 'The pendulum (in a grandfather clock) or balance wheel (in a wristwatch) swings at a fixed rate determined by physics — a pendulum\'s period depends only on its length and gravity, not its amplitude. This isochronism is what makes the clock accurate: each swing takes the same time regardless of how hard the spring pushes.',
        },
        {
          heading: 'Gearing Down',
          body: 'The escape wheel turns slowly, but the clock must show hours and minutes. A train of gears divides the rotation: the minute hand advances one tick per minute, the hour hand completes one revolution in 12 hours. Each gear ratio is precisely calculated so the hands move at the correct rate.',
        },
      ],
      factPanels: [
        { label: 'Pendulum period', value: 'T = 2π√(L/g) — depends on length, not amplitude' },
        { label: 'Escapement function', value: 'Releases one tooth per oscillation' },
        { label: 'Power source', value: 'Mainspring (potential energy)' },
        { label: 'Accuracy (mechanical)', value: '±2–10 seconds/day' },
      ],
      equation: { expression: 'T = 2π√(L/g)', description: 'A pendulum\'s period T depends only on its length L and gravitational acceleration g — not on the swing amplitude (for small angles).' },
      relatedDiscoveryIds: ['gyroscope', 'resonance'],
      learningFlow: [
        { phase: 'Notice', question: 'A clock ticks steadily whether the spring is freshly wound or nearly empty. Why?', answer: 'The escapement and oscillator regulate the release — the pendulum swings at the same rate regardless of spring tension.' },
        { phase: 'Wonder', question: 'What stops the spring from unwinding all at once?', answer: 'The escapement — it catches and releases one tooth at a time, gating the energy into equal steps.' },
        { phase: 'Predict', question: 'If you move a pendulum clock to the Moon, will it keep correct time?', answer: 'No — g is lower on the Moon, so T = 2π√(L/g) increases. The clock runs slow. The pendulum must be shortened to compensate.' },
        { phase: 'Explore', question: 'Why does a pendulum\'s period not depend on how far it swings?', answer: "For small angles, the restoring force is proportional to displacement, so the period is constant — this property is called isochronism." },
        { phase: 'Discover', question: 'What is the essential function of a mechanical clock?', answer: 'It converts a store of energy into a sequence of equal time intervals, using an oscillator to define the interval and an escapement to gate the energy.' },
        { phase: 'Formalise', question: 'Write the pendulum period equation and explain what it depends on.', answer: 'T = 2π√(L/g). It depends only on pendulum length L and gravity g — not on amplitude or mass.' },
        { phase: 'Apply', question: 'Quartz watches replaced mechanical ones. What is the oscillator in a quartz watch?', answer: 'A quartz crystal vibrating at 32,768 Hz. It is far more stable than a pendulum because the crystal frequency depends on its physical dimensions, not on gravity or temperature.' },
      ],
    },
  },
  {
    id: 'snowflake',
    question: 'Why do snowflakes have six sides?',
    category: 'Nature',
    image: IMG.snowflake,
    imageAlt: 'Macro photograph of snowflakes showing intricate hexagonal patterns.',
    caption: 'Water molecules bond at 120° angles, forcing ice crystals into six-fold symmetry.',
    shortAnswer:
      'Water molecules in ice form a hexagonal crystal lattice because hydrogen bonds orient at 120°. As the crystal grows, this six-fold symmetry repeats at every scale.',
    discovery: {
      imageCaption:
        'The hexagonal ice lattice: each water molecule bonds to four neighbours in a tetrahedral arrangement, producing a six-fold crystal structure.',
      introQuestion: 'No two snowflakes are alike, yet all have six points. What forces this universal shape?',
      annotations: [
        { number: 1, label: 'Water molecule: H₂O, bent geometry' },
        { number: 2, label: 'Hydrogen bonds at 120° angles' },
        { number: 3, label: 'Hexagonal lattice grows symmetrically' },
      ],
      explanationSections: [
        {
          heading: 'The Molecular Shape',
          body: 'A water molecule is V-shaped: two hydrogen atoms bonded to oxygen at about 104.5°. When water freezes, hydrogen bonds form between molecules. The most stable arrangement is a hexagonal lattice, where each molecule is surrounded by four neighbours in a tetrahedral pattern. This lattice has six-fold rotational symmetry.',
        },
        {
          heading: 'Why Six, Not Four or Eight',
          body: 'The 104.5° bond angle of water is close to the 120° needed for a perfect hexagon. When the molecules arrange themselves in the lowest-energy configuration, the hexagonal lattice is the result. This is why ice, snowflakes, and frost patterns all show six-fold symmetry — the molecular geometry forces it.',
        },
        {
          heading: 'Why Each Snowflake is Unique',
          body: 'A snowflake\'s shape depends on the exact path of temperature and humidity it experiences as it falls. Each branch grows independently but under the same conditions, so the six arms are nearly identical (a single flake is symmetric). But no two flakes follow the same path, so no two are alike. The variation comes from the environment, not the molecular geometry.',
        },
      ],
      factPanels: [
        { label: 'Bond angle', value: '~104.5° (close to 120° for hexagon)' },
        { label: 'Crystal system', value: 'Hexagonal' },
        { label: 'Symmetry', value: 'Six-fold rotational' },
        { label: 'Branch symmetry', value: 'Six arms identical within one flake' },
      ],
      relatedDiscoveryIds: ['water-droplet', 'crystal-structure'],
      learningFlow: [
        { phase: 'Notice', question: 'Snowflakes always have six arms, never five or eight. Why six?', answer: 'Water molecules bond at angles close to 120°, which naturally forms hexagonal (six-sided) patterns.' },
        { phase: 'Wonder', question: 'If the structure is always hexagonal, why is every snowflake different?', answer: 'Each flake experiences a unique path of temperature and humidity, and these conditions determine the exact branch pattern at each step.' },
        { phase: 'Predict', question: 'Would snowflakes on another planet also be six-sided?', answer: 'Only if water forms the same hexagonal lattice. On a planet with different pressure or temperature, ice may form in different crystal structures (ice has many polymorphs).' },
        { phase: 'Explore', question: 'Why are the six arms of a single snowflake identical?', answer: 'All six arms grow simultaneously under the same local conditions. Each branch experiences the same temperature and humidity at the same time.' },
        { phase: 'Discover', question: 'What is the connection between the molecular angle and the macroscopic shape?', answer: 'The 104.5° H-O-H angle is close to 120°. When molecules arrange in the lowest-energy lattice, this produces hexagons. The molecular geometry propagates to the visible scale.' },
        { phase: 'Formalise', question: 'Explain why ice has hexagonal symmetry.', answer: 'Water molecules in ice form hydrogen bonds in a tetrahedral arrangement. The lowest-energy lattice for this geometry is hexagonal, giving ice six-fold rotational symmetry.' },
        { phase: 'Apply', question: 'Why do scientists study snowflake formation in cloud chambers?', answer: 'Understanding how crystals grow from vapour helps model cloud physics, predict precipitation, and design materials with controlled crystal structures — from semiconductors to pharmaceuticals.' },
      ],
    },
  },
  {
    id: 'lightning',
    question: 'What causes lightning?',
    category: 'Physics',
    image: IMG.lightning,
    imageAlt: 'Lightning bolt illuminating a dark stormy sky.',
    caption: 'Lightning is a massive electrostatic discharge that equalises charge between cloud and ground.',
    shortAnswer:
      'Lightning is an electrostatic discharge caused by charge separation in storm clouds. When the electric field becomes strong enough, it ionises air, creating a conductive path for current to flow.',
    discovery: {
      imageCaption:
        'Charge separation in a storm cloud: collisions between ice particles separate positive and negative charges. When the field exceeds air\'s breakdown voltage, a bolt equalises the charge.',
      introQuestion: 'Air is an excellent insulator. How does electricity suddenly travel through kilometres of it in a lightning bolt?',
      annotations: [
        { number: 1, label: 'Updrafts separate charge: positive top, negative bottom' },
        { number: 2, label: 'Stepped leader forges an ionised path downward' },
        { number: 3, label: 'Return stroke: massive current flows upward' },
      ],
      explanationSections: [
        {
          heading: 'Charge Separation',
          body: 'Inside a thunderstorm, updrafts carry small ice crystals upward (they acquire positive charge) while heavier hail pellets fall (they acquire negative charge). This separates charge vertically: positive charge at the top of the cloud, negative at the bottom. The ground below becomes positively charged by induction.',
        },
        {
          heading: 'Breaking Down the Insulator',
          body: 'When the electric field reaches about 3 million volts per metre, it exceeds air\'s dielectric strength. Air ionises — electrons are stripped from molecules, creating a conductive plasma. A stepped leader forges an ionised path downward. When it nears the ground, a positive streamer rises to meet it. The connection completes the circuit.',
        },
        {
          heading: 'The Return Stroke',
          body: 'The visible flash is the return stroke: a surge of current flowing upward from ground to cloud at about one-third the speed of light. It carries 10,000–30,000 amps and heats the air to 30,000°C — five times hotter than the sun\'s surface. The rapid heating expands the air explosively, producing thunder.',
        },
      ],
      factPanels: [
        { label: 'Peak current', value: '10,000–30,000 A' },
        { label: 'Air breakdown field', value: '~3 MV/m' },
        { label: 'Temperature', value: '~30,000°C (5× sun\'s surface)' },
        { label: 'Speed of return stroke', value: '~1/3 speed of light' },
      ],
      relatedDiscoveryIds: ['conduction', 'electromagnetic-induction'],
      learningFlow: [
        { phase: 'Notice', question: 'Lightning always comes from storm clouds. What is special about those clouds?', answer: 'They contain ice particles colliding, which separates electric charge.' },
        { phase: 'Wonder', question: 'Air does not normally conduct electricity. What changes to allow a lightning bolt?', answer: 'The electric field becomes strong enough to ionise air — strip electrons from molecules, creating a conductive plasma path.' },
        { phase: 'Predict', question: 'Why does lightning usually strike the tallest object in an area?', answer: 'The positive streamer from a tall object reaches higher, meeting the stepped leader sooner. The path of least resistance is shorter.' },
        { phase: 'Explore', question: 'What causes the thunder that follows lightning?', answer: 'The air is heated to 30,000°C and expands explosively. The shock wave is thunder.' },
        { phase: 'Discover', question: 'What is the fundamental process that creates lightning?', answer: 'Charge separation by collision in turbulent clouds, followed by dielectric breakdown of air when the field exceeds its limit.' },
        { phase: 'Formalise', question: 'Explain the relationship between charge separation and dielectric breakdown.', answer: 'Collisions separate charge, building an electric field. When the field exceeds air\'s dielectric strength (~3 MV/m), air ionises and becomes conductive, allowing discharge.' },
        { phase: 'Apply', question: 'Why do lightning rods protect buildings?', answer: 'They provide a preferred path for the stepped leader — a grounded conductor that safely channels the current to earth, preventing it from passing through the building.' },
      ],
    },
  },
  {
    id: 'induction',
    question: 'How can moving a magnet create electricity?',
    category: 'Physics',
    image: IMG.copper,
    imageAlt: 'Copper wire coil demonstrating electromagnetic induction.',
    caption: 'A changing magnetic field induces a voltage in a nearby conductor — the principle behind every generator.',
    shortAnswer:
      'Faraday\'s law of induction states that a changing magnetic field through a loop of wire induces a voltage. This is how every electric generator and transformer works.',
    discovery: {
      imageCaption:
        'Electromagnetic induction: as a magnet moves through a coil, the changing magnetic flux induces a voltage that drives current through the circuit.',
      introQuestion: 'You can power a light by moving a magnet through a coil of wire. No battery needed. Where does the energy come from?',
      annotations: [
        { number: 1, label: 'Moving magnet changes magnetic flux through coil' },
        { number: 2, label: 'Changing flux induces voltage (EMF)' },
        { number: 3, label: 'Induced voltage drives current through the circuit' },
      ],
      explanationSections: [
        {
          heading: 'Faraday\'s Discovery',
          body: 'In 1831, Michael Faraday found that a changing magnetic field through a loop of wire induces a voltage across the wire. A stationary magnet produces no current — only when the field changes (by moving the magnet, moving the coil, or changing the field strength) is a voltage induced. This is electromagnetic induction.',
        },
        {
          heading: 'Magnetic Flux',
          body: 'Magnetic flux measures how much magnetic field passes through a loop. The induced voltage is proportional to how fast the flux changes: a slow change gives a small voltage, a fast change gives a large one. This is why generators spin — the rotation continuously changes the flux, producing a steady voltage.',
        },
        {
          heading: 'From Generator to Power Grid',
          body: 'Every power plant — coal, nuclear, hydro, wind — uses the same principle. A turbine spins a coil inside a magnetic field (or a magnet inside a coil). The mechanical energy of the turbine is converted to electrical energy by induction. The only difference between power sources is what spins the turbine: steam, falling water, or wind.',
        },
      ],
      factPanels: [
        { label: 'Faraday\'s Law', value: 'EMF = −dΦ/dt' },
        { label: 'Key condition', value: 'Magnetic flux must be changing' },
        { label: 'Direction', value: 'Induced current opposes the change (Lenz\'s law)' },
        { label: 'Applications', value: 'Generators, transformers, motors' },
      ],
      equation: { expression: 'ε = −dΦ_B/dt', description: 'Faraday\'s law: induced EMF ε equals the negative rate of change of magnetic flux Φ_B. The minus sign is Lenz\'s law — the induced current opposes the change.' },
      relatedDiscoveryIds: ['conduction', 'lightning'],
      learningFlow: [
        { phase: 'Notice', question: 'A magnet sitting inside a coil produces no current. But move it, and current flows. What is different?', answer: 'Movement changes the magnetic flux through the coil. Only a changing flux induces voltage.' },
        { phase: 'Wonder', question: 'Where does the electrical energy come from if there is no battery?', answer: 'From the mechanical work of moving the magnet. You convert kinetic energy into electrical energy.' },
        { phase: 'Predict', question: 'If you move the magnet faster, will the induced voltage increase or decrease?', answer: 'Increase — the rate of change of flux is higher, so the induced EMF is larger.' },
        { phase: 'Explore', question: 'Why does the induced current flow in a direction that opposes the magnet\'s motion?', answer: "Lenz's law: the induced current creates its own magnetic field that opposes the change in flux, conserving energy." },
        { phase: 'Discover', question: 'What is the fundamental relationship between magnetism and electricity?', answer: 'A changing magnetic field creates an electric field. This is one of the four Maxwell equations and is the basis of all electric power generation.' },
        { phase: 'Formalise', question: 'State Faraday\'s law in mathematical form.', answer: 'ε = −dΦ_B/dt — the induced EMF equals the negative rate of change of magnetic flux.' },
        { phase: 'Apply', question: 'Why do wireless charging pads need the phone to be very close?', answer: 'The magnetic field from the pad decreases rapidly with distance. At greater separation, too little flux reaches the receiver coil to induce useful voltage.' },
      ],
    },
  },
  {
    id: 'recursion',
    question: 'How does recursion solve a problem by calling itself?',
    category: 'Computer Science' as any,
    image: IMG.leafVeins,
    imageAlt: 'A leaf skeleton showing branching vein patterns, reminiscent of a recursion tree.',
    caption: 'Recursion breaks a problem into smaller versions of itself until it reaches a trivial base case.',
    shortAnswer:
      'Recursion solves a problem by expressing it in terms of a smaller instance of the same problem, with a base case that stops the chain. Each call adds a frame to the call stack.',
    discovery: {
      imageCaption:
        'Recursion tree: each call spawns smaller subproblems. The base case terminates the branches. The final answer combines results from all leaves.',
      introQuestion: 'How can a function call itself without looping forever? What stops the chain?',
      annotations: [
        { number: 1, label: 'Base case: the trivial instance that stops recursion' },
        { number: 2, label: 'Recursive case: call the function on a smaller input' },
        { number: 3, label: 'Results combine as the stack unwinds' },
      ],
      explanationSections: [
        {
          heading: 'The Two Parts of Recursion',
          body: 'Every recursive function has two parts. The base case handles the smallest input directly and returns a value. The recursive case calls the same function on a smaller input, working toward the base case. Without a correct base case, recursion never stops — it causes a stack overflow.',
        },
        {
          heading: 'The Call Stack',
          body: 'Each recursive call adds a frame to the call stack, storing local variables and the return address. When the base case returns, the stack unwinds: each frame completes its calculation and passes the result to the frame below. The final answer is assembled as the stack collapses.',
        },
        {
          heading: 'Recursion vs. Iteration',
          body: 'Any recursive function can be rewritten as a loop. Recursion is preferred when the problem is naturally self-similar: tree traversal, fractal generation, divide-and-conquer algorithms like merge sort. Iteration is more efficient when the structure is linear — no stack frames are needed.',
        },
      ],
      factPanels: [
        { label: 'Base case', value: 'The condition that stops recursion' },
        { label: 'Stack frame', value: 'One per recursive call' },
        { label: 'Space cost', value: 'O(depth) for the call stack' },
        { label: 'Classic example', value: 'Factorial: n! = n × (n-1)!' },
      ],
      equation: { expression: 'factorial(n) = n × factorial(n-1), factorial(0) = 1', description: 'The factorial function defined recursively: the base case is factorial(0) = 1, and each recursive call reduces n by 1.' },
      relatedDiscoveryIds: ['binary-search', 'sorting'],
      learningFlow: [
        { phase: 'Notice', question: 'Russian nesting dolls: each doll opens to reveal a smaller one, until the tiniest. What is the smallest doll?', answer: 'The base case — the one that does not open. Recursion always has one.' },
        { phase: 'Wonder', question: 'Can a function use its own result to compute its result? Is that circular?', answer: 'Not if the recursive call is on a smaller input. The chain terminates at the base case.' },
        { phase: 'Predict', question: 'What happens if you forget the base case?', answer: 'The function calls itself forever, filling the call stack until it overflows — a stack overflow error.' },
        { phase: 'Explore', question: 'How would you compute factorial(4) using recursion?', answer: 'factorial(4) = 4 × factorial(3) = 4 × 3 × factorial(2) = ... = 4 × 3 × 2 × 1 × 1 = 24' },
        { phase: 'Discover', question: 'When is recursion better than a loop?', answer: 'When the problem has a naturally self-similar structure — trees, fractals, divide-and-conquer. Linear problems are simpler as loops.' },
        { phase: 'Formalise', question: 'Write the recursive definition of factorial.', answer: 'factorial(n) = n × factorial(n-1) with base case factorial(0) = 1' },
        { phase: 'Apply', question: 'Why does merge sort use recursion?', answer: 'Merge sort divides the array in half, sorts each half (the same problem, smaller), then merges. The self-similar structure makes recursion the natural expression.' },
      ],
    },
  },
  {
    id: 'nebula',
    question: 'What is a nebula and how do stars form within it?',
    category: 'Space',
    image: IMG.nebula,
    imageAlt: 'Colourful gas clouds and stars in a cosmic nebula.',
    caption: 'A nebula is a cloud of gas and dust where gravity can collapse material into new stars.',
    shortAnswer:
      'A nebula is a vast cloud of gas (mostly hydrogen) and dust. Gravity causes denser regions to collapse, heating the gas until nuclear fusion ignites a star.',
    discovery: {
      imageCaption:
        'Star formation in a nebula: dense clumps collapse under gravity, the core heats up, and when temperature reaches ~10 million K, hydrogen fusion begins.',
      introQuestion: 'Stars are incredibly massive and hot. How does cold, diffuse gas in space become a nuclear furnace?',
      annotations: [
        { number: 1, label: 'Gravity draws gas and dust together' },
        { number: 2, label: 'Collapsing core heats up under pressure' },
        { number: 3, label: 'Fusion ignites at ~10 million K' },
      ],
      explanationSections: [
        {
          heading: 'From Cloud to Core',
          body: 'A nebula is mostly hydrogen and helium, spread across light-years. In denser regions, gravity slowly pulls material together. As the clump grows, its gravitational pull increases, drawing in more gas. The collapsing core becomes denser and hotter as gravitational potential energy converts to thermal energy.',
        },
        {
          heading: 'Ignition',
          body: 'When the core reaches about 10 million Kelvin, hydrogen nuclei begin to fuse into helium, releasing enormous energy. The outward pressure from fusion balances the inward pull of gravity. The star is born — it will shine for millions to billions of years as long as this balance holds.',
        },
        {
          heading: 'What Triggers Collapse',
          body: 'Gravity alone may not start the collapse — the gas is often too diffuse. A trigger helps: a shock wave from a nearby supernova, radiation pressure from a hot star, or a galactic collision compresses the gas enough for gravity to take over. This is why star formation often happens in clusters and along spiral arms.',
        },
      ],
      factPanels: [
        { label: 'Composition', value: '~75% hydrogen, ~25% helium, trace dust' },
        { label: 'Ignition temperature', value: '~10 million K' },
        { label: 'Typical size', value: '1–100 light-years across' },
        { label: 'Fusion reaction', value: '4H → He + energy' },
      ],
      relatedDiscoveryIds: ['lightning', 'rainbow'],
      learningFlow: [
        { phase: 'Notice', question: 'Nebulae look like glowing clouds in telescope images. What are they made of?', answer: 'Mostly hydrogen and helium gas with trace dust, spread over vast distances.' },
        { phase: 'Wonder', question: 'How does diffuse gas become a dense, hot star?', answer: 'Gravity collapses denser regions, converting gravitational potential energy into heat as the core compresses.' },
        { phase: 'Predict', question: 'What stops a star from collapsing forever once fusion starts?', answer: 'Fusion creates outward radiation pressure that balances gravity. The star is in hydrostatic equilibrium.' },
        { phase: 'Explore', question: 'What triggers the initial collapse if the gas is very diffuse?', answer: 'External triggers — shock waves from supernovae, radiation from nearby massive stars, or galactic collisions compress the gas enough for gravity to dominate.' },
        { phase: 'Discover', question: 'What is the fundamental balance that defines a stable star?', answer: 'Hydrostatic equilibrium — gravity pulls inward, fusion pressure pushes outward. The star exists as long as these forces balance.' },
        { phase: 'Formalise', question: 'State the key reaction that powers a main-sequence star.', answer: 'Hydrogen fusion: four hydrogen nuclei combine into one helium nucleus, releasing energy via E = mc² from the mass defect.' },
        { phase: 'Apply', question: 'Why do more massive stars have shorter lifetimes?', answer: 'Greater mass means stronger gravity, requiring higher fusion rates to maintain equilibrium. The star burns its fuel faster and exhausts it sooner — massive stars live millions of years; small stars live billions.' },
      ],
    },
  },
  {
    id: 'brain-learning',
    question: 'How does the brain physically change when you learn?',
    category: 'Human Body',
    image: IMG.brain,
    imageAlt: 'Brain MRI scan showing neurological anatomy.',
    caption: 'Learning physically reshapes the brain — neurons that fire together wire together.',
    shortAnswer:
      'Learning strengthens synaptic connections and can grow new ones. Repeated activity makes signal transmission faster through a process called long-term potentiation.',
    discovery: {
      imageCaption:
        'Neuroplasticity: repeated stimulation strengthens synapses. Neurons that fire together build stronger connections, making future signalling more efficient.',
      introQuestion: 'When you practise a skill, you get better. What physically changes inside your brain?',
      annotations: [
        { number: 1, label: 'Repeated firing strengthens synaptic connections' },
        { number: 2, label: 'Myelin sheath thickens, speeding up signals' },
        { number: 3, label: 'New dendritic spines can form with practice' },
      ],
      explanationSections: [
        {
          heading: 'Synaptic Plasticity',
          body: 'Every time a neuron fires, the connection (synapse) it uses becomes slightly stronger. This is long-term potentiation (LTP): repeated stimulation increases the number of receptors on the receiving neuron, making it more responsive to future signals. "Neurons that fire together, wire together."',
        },
        {
          heading: 'Myelination',
          body: 'Many neurons are wrapped in a fatty insulating layer called myelin. When a neural pathway is used repeatedly, the myelin sheath thickens. Thicker myelin means faster signal transmission — up to 100 times faster. This is why practised skills feel effortless: the signals travel more efficiently.',
        },
        {
          heading: 'Structural Changes',
          body: 'The brain can grow new dendritic spines — tiny branches that receive signals from other neurons. London taxi drivers, who memorise the city\'s 25,000 streets, have enlarged hippocampi. The brain is not fixed at birth; it physically restructures itself in response to experience throughout life.',
        },
      ],
      factPanels: [
        { label: 'Synapses in brain', value: '~100 trillion' },
        { label: 'Neurons', value: '~86 billion' },
        { label: 'Key mechanism', value: 'Long-term potentiation (LTP)' },
        { label: 'Signal speed (myelinated)', value: 'Up to 120 m/s' },
      ],
      relatedDiscoveryIds: ['neural-network', 'recursion'],
      learningFlow: [
        { phase: 'Notice', question: 'When you practise piano, the first day is hard. A month later it is easy. What changed?', answer: 'The neural pathways for those finger movements have been strengthened and myelinated.' },
        { phase: 'Wonder', question: 'Is learning a chemical change, a structural change, or both?', answer: 'Both. LTP changes receptor chemistry at synapses, and myelination and new dendritic spines change the physical structure.' },
        { phase: 'Predict', question: 'If you stop practising a skill, do the brain changes persist forever?', answer: 'No — without reinforcement, synaptic connections weaken through long-term depression (LTD). "Use it or lose it."' },
        { phase: 'Explore', question: 'How does this compare to how artificial neural networks learn?', answer: 'Both adjust connection strengths based on activity. But biological brains also restructure physically (new spines, myelin), while artificial networks only change numerical weights.' },
        { phase: 'Discover', question: 'What is the physical basis of memory?', answer: 'Memory is stored in the pattern and strength of synaptic connections. Stronger, more numerous connections between specific groups of neurons encode specific memories and skills.' },
        { phase: 'Formalise', question: 'Explain Hebb\'s rule and its relationship to learning.', answer: '"Neurons that fire together, wire together." Repeated co-activation strengthens the synapse between two neurons, which is the cellular basis of associative learning.' },
        { phase: 'Apply', question: 'Why is spaced practice more effective than cramming for long-term retention?', answer: 'Spaced practice repeatedly triggers LTP with recovery periods, allowing structural consolidation. Cramming produces temporary chemical changes but does not allow time for myelination and spine formation that create durable memory.' },
      ],
    },
  },
];

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}
