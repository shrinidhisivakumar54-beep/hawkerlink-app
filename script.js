
const $ = id => document.getElementById(id);
const ICONS = {"fresh": "<svg viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"18\" fill=\"#e8f5e2\"/><!-- Bok choy leaves --><ellipse cx=\"36\" cy=\"52\" rx=\"10\" ry=\"6\" fill=\"#5a9e3a\"/><ellipse cx=\"36\" cy=\"52\" rx=\"6\" ry=\"4\" fill=\"#7cc45a\"/><!-- Left leaf --><path d=\"M26 46 Q18 34 28 28 Q30 40 36 44\" fill=\"#4a8e2a\"/><!-- Right leaf --><path d=\"M46 46 Q54 34 44 28 Q42 40 36 44\" fill=\"#4a8e2a\"/><!-- Center stalk --><path d=\"M36 28 Q34 36 36 52\" fill=\"none\" stroke=\"#3a7e1a\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><!-- Sparkle dots --><circle cx=\"22\" cy=\"30\" r=\"2.5\" fill=\"#c4521a\" opacity=\"0.7\"/><circle cx=\"52\" cy=\"26\" r=\"1.8\" fill=\"#c4521a\" opacity=\"0.5\"/><circle cx=\"55\" cy=\"40\" r=\"1.5\" fill=\"#5a9e3a\" opacity=\"0.6\"/></svg>", "map": "<svg viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"18\" fill=\"#fde8d8\"/><!-- Map base --><rect x=\"12\" y=\"20\" width=\"48\" height=\"36\" rx=\"5\" fill=\"#fff\" stroke=\"#e0c0a0\" stroke-width=\"1.5\"/><!-- Grid lines --><line x1=\"24\" y1=\"20\" x2=\"24\" y2=\"56\" stroke=\"#f0d8c0\" stroke-width=\"1\"/><line x1=\"36\" y1=\"20\" x2=\"36\" y2=\"56\" stroke=\"#f0d8c0\" stroke-width=\"1\"/><line x1=\"48\" y1=\"20\" x2=\"48\" y2=\"56\" stroke=\"#f0d8c0\" stroke-width=\"1\"/><line x1=\"12\" y1=\"32\" x2=\"60\" y2=\"32\" stroke=\"#f0d8c0\" stroke-width=\"1\"/><line x1=\"12\" y1=\"44\" x2=\"60\" y2=\"44\" stroke=\"#f0d8c0\" stroke-width=\"1\"/><!-- Roads --><path d=\"M12 38 Q30 35 60 38\" fill=\"none\" stroke=\"#e0c080\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M32 20 Q34 38 32 56\" fill=\"none\" stroke=\"#e0c080\" stroke-width=\"3\" stroke-linecap=\"round\"/><!-- Pin --><circle cx=\"38\" cy=\"33\" r=\"7\" fill=\"#c4521a\"/><circle cx=\"38\" cy=\"33\" r=\"3.5\" fill=\"#fff\"/><line x1=\"38\" y1=\"40\" x2=\"38\" y2=\"46\" stroke=\"#c4521a\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></svg>", "verified": "<svg viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"18\" fill=\"#e6f4ea\"/><!-- Shield --><path d=\"M36 14 L54 22 L54 38 Q54 52 36 60 Q18 52 18 38 L18 22 Z\" fill=\"#3a8a3a\"/><path d=\"M36 18 L51 25 L51 38 Q51 50 36 57 Q21 50 21 38 L21 25 Z\" fill=\"#5ab85a\"/><!-- Checkmark --><path d=\"M27 37 L33 43 L47 29\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><!-- Badge star top --><circle cx=\"36\" cy=\"14\" r=\"4\" fill=\"#c4521a\"/></svg>", "feedback": "<svg viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"18\" fill=\"#fde8d8\"/><!-- Chat bubble --><rect x=\"12\" y=\"14\" width=\"44\" height=\"34\" rx=\"10\" fill=\"#c4521a\"/><!-- Tail --><path d=\"M22 48 L18 58 L32 50\" fill=\"#c4521a\"/><!-- Dots --><circle cx=\"25\" cy=\"31\" r=\"3.5\" fill=\"#fff\"/><circle cx=\"36\" cy=\"31\" r=\"3.5\" fill=\"#fff\"/><circle cx=\"47\" cy=\"31\" r=\"3.5\" fill=\"#fff\"/></svg>", "stall": "<svg viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"18\" fill=\"#fde8d8\"/><!-- Stall roof --><path d=\"M8 30 L36 14 L64 30 Z\" fill=\"#c4521a\"/><!-- Stripes on roof --><path d=\"M8 30 L36 14 L64 30\" fill=\"none\" stroke=\"#a03800\" stroke-width=\"1\" opacity=\"0.3\"/><!-- Stall body --><rect x=\"14\" y=\"30\" width=\"44\" height=\"26\" rx=\"3\" fill=\"#fff\" stroke=\"#e0c0a0\" stroke-width=\"1.5\"/><!-- Counter --><rect x=\"14\" y=\"44\" width=\"44\" height=\"12\" rx=\"3\" fill=\"#f5dfc0\"/><!-- Window --><rect x=\"24\" y=\"34\" width=\"24\" height=\"10\" rx=\"3\" fill=\"#fde8d8\"/><!-- Lantern left --><ellipse cx=\"20\" cy=\"22\" rx=\"3\" ry=\"4.5\" fill=\"#e02020\" opacity=\"0.8\"/><line x1=\"20\" y1=\"17\" x2=\"20\" y2=\"15\" stroke=\"#8b4000\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><!-- Lantern right --><ellipse cx=\"52\" cy=\"22\" rx=\"3\" ry=\"4.5\" fill=\"#e02020\" opacity=\"0.8\"/><line x1=\"52\" y1=\"17\" x2=\"52\" y2=\"15\" stroke=\"#8b4000\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>", "share": "<svg viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"18\" fill=\"#fdf4e0\"/><!-- Bowl --><path d=\"M16 40 Q16 56 36 56 Q56 56 56 40 Z\" fill=\"#c4521a\"/><path d=\"M16 40 Q16 54 36 54 Q56 54 56 40\" fill=\"none\" stroke=\"#a03800\" stroke-width=\"1\" opacity=\"0.3\"/><!-- Rim --><ellipse cx=\"36\" cy=\"40\" rx=\"20\" ry=\"5\" fill=\"#d86030\"/><!-- Steam lines --><path d=\"M26 32 Q24 27 26 22 Q28 17 26 12\" fill=\"none\" stroke=\"#c4521a\" stroke-width=\"2\" stroke-linecap=\"round\" opacity=\"0.6\"/><path d=\"M36 30 Q34 25 36 20 Q38 15 36 10\" fill=\"none\" stroke=\"#c4521a\" stroke-width=\"2\" stroke-linecap=\"round\" opacity=\"0.5\"/><path d=\"M46 32 Q44 27 46 22 Q48 17 46 12\" fill=\"none\" stroke=\"#c4521a\" stroke-width=\"2\" stroke-linecap=\"round\" opacity=\"0.6\"/><!-- Chopsticks --><line x1=\"30\" y1=\"36\" x2=\"20\" y2=\"16\" stroke=\"#8b4000\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"34\" y1=\"36\" x2=\"26\" y2=\"14\" stroke=\"#8b4000\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></svg>", "community": "<svg viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"18\" fill=\"#e8f5e2\"/><!-- Person left --><circle cx=\"22\" cy=\"24\" r=\"8\" fill=\"#5a9e3a\"/><path d=\"M10 50 Q10 40 22 40 Q34 40 34 50\" fill=\"#5a9e3a\"/><!-- Person right --><circle cx=\"50\" cy=\"24\" r=\"8\" fill=\"#c4521a\"/><path d=\"M38 50 Q38 40 50 40 Q62 40 62 50\" fill=\"#c4521a\"/><!-- Heart between --><path d=\"M36 34 Q36 28 40 28 Q44 28 44 32 Q44 28 48 28 Q52 28 52 34 Q52 40 44 46 Q36 40 36 34 Z\" fill=\"#e85050\" opacity=\"0\" /><!-- Simple heart --><path d=\"M31 33 Q31 29 34.5 29 Q36 29 37 30.5 Q38 29 39.5 29 Q43 29 43 33 Q43 37 37 41 Q31 37 31 33 Z\" fill=\"#e85050\"/></svg>", "nowaste": "<svg viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"18\" fill=\"#e6f4ea\"/><!-- Circular arrows --><path d=\"M36 16 A20 20 0 0 1 56 36\" fill=\"none\" stroke=\"#5ab85a\" stroke-width=\"5\" stroke-linecap=\"round\"/><path d=\"M56 36 A20 20 0 0 1 36 56\" fill=\"none\" stroke=\"#3a8a3a\" stroke-width=\"5\" stroke-linecap=\"round\"/><path d=\"M36 56 A20 20 0 0 1 16 36\" fill=\"none\" stroke=\"#5ab85a\" stroke-width=\"5\" stroke-linecap=\"round\"/><path d=\"M16 36 A20 20 0 0 1 36 16\" fill=\"none\" stroke=\"#3a8a3a\" stroke-width=\"5\" stroke-linecap=\"round\"/><!-- Arrow heads --><polygon points=\"36,10 30,18 42,18\" fill=\"#5ab85a\"/><!-- Leaf inside --><path d=\"M36 28 Q42 28 42 34 Q42 40 36 40 Q30 40 30 34 Q30 28 36 28 Z\" fill=\"#c4521a\"/><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"44\" stroke=\"#c4521a\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>", "notif": "<svg viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"18\" fill=\"#fde8d8\"/><!-- Bell body --><path d=\"M36 12 Q22 14 20 32 L18 48 L54 48 L52 32 Q50 14 36 12 Z\" fill=\"#c4521a\"/><!-- Bell top --><circle cx=\"36\" cy=\"13\" r=\"4\" fill=\"#a03800\"/><!-- Clapper --><ellipse cx=\"36\" cy=\"52\" rx=\"6\" ry=\"4\" fill=\"#a03800\"/><!-- Shine --><ellipse cx=\"29\" cy=\"26\" rx=\"3\" ry=\"5\" fill=\"#fff\" opacity=\"0.2\" transform=\"rotate(-20 29 26)\"/><!-- Badge dot --><circle cx=\"52\" cy=\"20\" r=\"7\" fill=\"#e85050\"/><text x=\"52\" y=\"24\" text-anchor=\"middle\" font-size=\"9\" fill=\"#fff\" font-weight=\"700\">3</text></svg>", "profile": "<svg viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"18\" fill=\"#fde8d8\"/><!-- Avatar circle --><circle cx=\"36\" cy=\"26\" r=\"13\" fill=\"#c4521a\"/><!-- Face --><circle cx=\"36\" cy=\"26\" r=\"10\" fill=\"#f5c8a0\"/><!-- Hair --><path d=\"M26 22 Q26 14 36 14 Q46 14 46 22 Q44 18 36 18 Q28 18 26 22 Z\" fill=\"#5a3010\"/><!-- Smile --><path d=\"M31 29 Q36 34 41 29\" fill=\"none\" stroke=\"#8b4000\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><!-- Eyes --><circle cx=\"31\" cy=\"25\" r=\"1.5\" fill=\"#5a3010\"/><circle cx=\"41\" cy=\"25\" r=\"1.5\" fill=\"#5a3010\"/><!-- Body --><path d=\"M16 58 Q16 46 36 46 Q56 46 56 58\" fill=\"#c4521a\"/></svg>", "search": "<svg viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"18\" fill=\"#fdf4e0\"/><!-- Magnifier glass --><circle cx=\"32\" cy=\"30\" r=\"14\" fill=\"none\" stroke=\"#c4521a\" stroke-width=\"5\"/><circle cx=\"32\" cy=\"30\" r=\"10\" fill=\"#fff\" opacity=\"0.6\"/><!-- Handle --><line x1=\"43\" y1=\"41\" x2=\"56\" y2=\"54\" stroke=\"#c4521a\" stroke-width=\"5\" stroke-linecap=\"round\"/><!-- Food icon inside --><path d=\"M28 28 Q28 24 32 24 Q36 24 36 28 Q36 32 32 34 Q28 32 28 28 Z\" fill=\"#5a9e3a\"/><line x1=\"32\" y1=\"34\" x2=\"32\" y2=\"37\" stroke=\"#5a9e3a\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>", "collect": "<svg viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"18\" fill=\"#fde8d8\"/><!-- Bag --><rect x=\"16\" y=\"32\" width=\"40\" height=\"28\" rx=\"6\" fill=\"#c4521a\"/><!-- Handle --><path d=\"M26 32 Q26 20 36 20 Q46 20 46 32\" fill=\"none\" stroke=\"#c4521a\" stroke-width=\"4\" stroke-linecap=\"round\"/><!-- Lock clasp --><rect x=\"30\" y=\"28\" width=\"12\" height=\"8\" rx=\"3\" fill=\"#a03800\"/><!-- Arrow --><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"52\" stroke=\"#fff\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M30 48 L36 54 L42 48\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>"};
const icon = (name) => ICONS[name] || '';

const screens = [...document.querySelectorAll('.screen')];
const bottomNav = $('bottomNav');

const defaultListings = [
  { item:'Spinach and Cabbage', category:'vegetables', qty:'8 bundles', qtyLeft:8, stall:'Ah Lim Fresh Vegetables', centre:'Pasir Ris Central Hawker Centre', location:'Stall #02-14, green collection counter', time:'Today, 6 PM – 8 PM', rating:'4.8', price:'Free' },
  { item:'Kang Kong bundles', category:'vegetables', qty:'10 bundles', qtyLeft:10, stall:'Pasir Ris Fresh Greens', centre:'Pasir Ris Central Hawker Centre', location:'Stall #01-09, beside drinks stall', time:'Today, 6:30 PM – 8 PM', rating:'4.7', price:'$1.00 / bundle' },
  { item:'Tomatoes and Carrots', category:'vegetables', qty:'12 packs', qtyLeft:12, stall:'Muthu Veg Corner', centre:'Tampines Round Market', location:'Stall #01-22, vegetable aisle', time:'Today, 7 PM – 8:30 PM', rating:'4.7', price:'$1.50 / pack' },
  { item:'Banana bunches', category:'fruit', qty:'6 bunches', qtyLeft:6, stall:'Happy Fruit Stall', centre:'Pasir Ris Central Hawker Centre', location:'Stall #02-03, fruit section', time:'Tomorrow, 9 AM – 10:30 AM', rating:'4.6', price:'Pay what you can' },
  { item:'Vegetable bee hoon packs', category:'meals', qty:'5 packs', qtyLeft:5, stall:'Aunty Mei Kitchen', centre:'Pasir Ris Central Hawker Centre', location:'Stall #01-16, cooked food row', time:'Today, 8 PM – 8:45 PM', rating:'4.9', price:'$2.00 / pack' }
].map((x,i)=>({id:'seed-'+i, ...x}));

const centres = [
  {name:'Pasir Ris Central Hawker Centre', distance:'0.4 km', note:'Main pickup hub', top:'45%', left:'54%'},
  {name:'Pasir Ris West Plaza Food Court', distance:'1.3 km', note:'Nearby resident collection point', top:'55%', left:'35%'},
  {name:'Tampines Round Market & Food Centre', distance:'3.8 km', note:'Fresh produce stalls', top:'70%', left:'28%'},
  {name:'Loyang Point Food Court', distance:'2.4 km', note:'East-side collection option', top:'38%', left:'73%'},
  {name:'White Sands Food Court', distance:'0.8 km', note:'Near Pasir Ris MRT', top:'50%', left:'62%'}
];

let currentUser = JSON.parse(localStorage.getItem('hawkerlink_v7_currentUser')) || null;
let users = JSON.parse(localStorage.getItem('hawkerlink_v7_users')) || [];
let listings = JSON.parse(localStorage.getItem('hawkerlink_v7_listings')) || defaultListings;
let orders = JSON.parse(localStorage.getItem('hawkerlink_v7_orders')) || [];
let feedback = JSON.parse(localStorage.getItem('hawkerlink_v7_feedback')) || [];
let pendingClaimId = null;
let selectedPayment = 'PayNow';

function normaliseListing(x){
  const qtyText = x.qty || x.quantity || '1 available pack';
  const qtyNum = Number(x.qtyLeft ?? String(qtyText).match(/\d+/)?.[0] ?? 1);
  return {
    id: String(x.id || crypto.randomUUID()),
    item: x.item || x.name || 'Untitled listing',
    category: x.category || 'vegetables',
    qty: qtyText,
    qtyLeft: qtyNum,
    stall: x.stall || 'Verified Hawker',
    centre: x.centre || 'Pasir Ris Central Hawker Centre',
    location: x.location || x.pickup || 'Stall pickup counter',
    time: x.time || x.collection || 'Today, 6 PM – 8 PM',
    rating: x.rating || 'New',
    price: x.price || x.pricing || 'Free'
  };
}
listings = listings.map(normaliseListing);

function saveAll(){
  localStorage.setItem('hawkerlink_v7_users', JSON.stringify(users));
  if(currentUser) localStorage.setItem('hawkerlink_v7_currentUser', JSON.stringify(currentUser));
  localStorage.setItem('hawkerlink_v7_listings', JSON.stringify(listings));
  localStorage.setItem('hawkerlink_v7_orders', JSON.stringify(orders));
  localStorage.setItem('hawkerlink_v7_feedback', JSON.stringify(feedback));
}

function toast(msg){
  const t=$('toast'); t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2600);
}

function go(screenId){
  screens.forEach(s=>s.classList.toggle('active', s.id===screenId));
  bottomNav.classList.toggle('show', !!currentUser && screenId !== 'authScreen');
  renderBottomNav(screenId);
  if(screenId==='homeScreen') renderHome();
  if(screenId==='listingsScreen') renderListings(document.querySelector('.chip.active')?.dataset.filter || 'all');
  if(screenId==='ordersScreen') renderOrders();
  if(screenId==='feedbackScreen') renderFeedback();
  if(screenId==='profileScreen') renderProfile();
  if(screenId==='mapScreen') renderCentres();
  window.scrollTo(0,0);
}

function renderBottomNav(active='homeScreen'){
  if(!currentUser) return;
  const resident = [
    ['homeScreen','stall','Home'], ['mapScreen','map','Map'], ['ordersScreen','collect','Collection'], ['feedbackScreen','feedback','Feedback'], ['profileScreen','profile','Profile']
  ];
  const hawker = [
    ['homeScreen','stall','Home'], ['addListingScreen','fresh','List'], ['verifyScreen','verified','Verify'], ['mapScreen','map','Map'], ['profileScreen','profile','Profile']
  ];
  const items = currentUser.role === 'hawker' ? hawker : resident;
  bottomNav.innerHTML = items.map(([target,ic,label])=>`
    <button data-go="${target}" class="nav-btn ${active===target?'active':''}" type="button">
      <span class="nav-ico">${icon(ic)}</span><span class="nav-label">${label}</span>
    </button>`).join('');
  bottomNav.querySelectorAll('.nav-btn').forEach(btn=>btn.addEventListener('click',()=>go(btn.dataset.go)));
}

function renderHome(){
  if(!currentUser) return;
  $('accountLabel').textContent = currentUser.role === 'hawker' ? 'Hawker account' : 'Resident account';
  $('userName').textContent = currentUser.name || currentUser.username;
  const roleAlert = $('roleAlert');
  if(currentUser.role === 'hawker'){
    roleAlert.className = 'role-alert show';
    roleAlert.textContent = currentUser.verified ? '✅ Your hawker account is verified. You can publish surplus listings with pricing.' : '⚠️ Verification pending. Submit your food hygiene certificate before publishing listings.';
  } else { roleAlert.className = 'role-alert'; roleAlert.textContent = ''; }

  const residentCards = [
    ['fresh','Fresh Listings','Browse available vegetables, fruit, and meals with quantity, price, pickup point, and collection window.','listingsScreen','green'],
    ['map','Nearby Map','Default set to Pasir Ris. View nearby hawker centre icons and open Google Maps.','mapScreen','orange'],
    ['collect','My Collections','Track claimed items, payment method, claim code, price, collection time, and pickup point.','ordersScreen','green'],
    ['feedback','Feedback','Rate stalls and share comments after collection to improve trust.','feedbackScreen','orange']
  ];
  const hawkerCards = [
    ['verified','Verify Stall','Submit stall details and food hygiene certificate before listing items.','verifyScreen','green'],
    ['fresh','Add Listing','Publish surplus items with category, quantity, pricing, pickup location, and timing.','addListingScreen','orange'],
    ['map','Nearby Map','View Pasir Ris pickup landmarks and resident collection zones.','mapScreen','green'],
    ['profile','Hawker Profile','View saved stall details, certificate status, username, and account information.','profileScreen','orange']
  ];
  const cards = currentUser.role === 'hawker' ? hawkerCards : residentCards;
  $('quickGrid').innerHTML = cards.map(c=>`
    <button class="quick-card ${c[4]}" data-go="${c[3]}">
      <div class="quick-top"><div class="quick-icon svg-icon">${icon(c[0])}</div><div class="arrow">→</div></div>
      <div><h3>${c[1]}</h3><p>${c[2]}</p></div>
    </button>`).join('');
  $('quickGrid').querySelectorAll('[data-go]').forEach(btn=>btn.addEventListener('click',()=>go(btn.dataset.go)));
}

function renderListings(filter='all'){
  listings = listings.map(normaliseListing);
  const data = filter==='all' ? listings : listings.filter(x=>x.category===filter);
  $('listingContainer').innerHTML = data.map(x=>`
    <article class="listing-card">
      <div class="listing-head">
        <div><h3>${x.item}</h3><p class="small-note">${x.stall} • ⭐ ${x.rating}</p></div>
        <span class="tag price-tag">${x.price}</span>
      </div>
      <span class="qty-pill">${x.qtyLeft > 0 ? `${x.qtyLeft} left` : 'Fully claimed'}</span>
      <div class="meta">
        <div><small>Quantity</small><b>${x.qty}</b></div>
        <div><small>Price</small><b>${x.price}</b></div>
        <div><small>Collection</small><b>${x.time}</b></div>
        <div><small>Pickup</small><b>${x.location}</b></div>
        <div class="meta-wide"><small>Centre</small><b>${x.centre}</b></div>
      </div>
      ${currentUser?.role==='resident' ? `<button class="secondary-btn claim-btn" data-claim-id="${x.id}" ${x.qtyLeft<=0?'disabled':''}>${x.qtyLeft<=0?'Fully claimed':'Claim item'}</button>` : `<button class="secondary-btn" onclick="toast('Listing is visible to residents with price and collection details.')">Visible to residents</button>`}
    </article>`).join('') || `<div class="status-card">No listings in this category yet.</div>`;
}

window.openClaimModal = function(id){
  const item = listings.find(x=>String(x.id)===String(id)); if(!item) return;
  if(orders.some(o=>String(o.id)===String(id) && o.username===currentUser.username)){ toast('You already claimed this item. Check My Collections.'); go('ordersScreen'); return; }
  pendingClaimId = id; selectedPayment = 'PayNow';
  $('modalItemName').textContent = item.item;
  $('modalSummary').innerHTML = `
    <div><span>Quantity</span><b>${item.qty}</b></div>
    <div><span>Price</span><b>${item.price}</b></div>
    <div><span>Collection</span><b>${item.time}</b></div>
    <div><span>Pickup</span><b>${item.location}</b></div>
    <div><span>Centre</span><b>${item.centre}</b></div>`;
  document.querySelectorAll('.payment-option').forEach(b=>b.classList.toggle('active', b.dataset.payment==='PayNow'));
  $('claimModal').classList.add('show');
}
function closeClaimModal(){ $('claimModal').classList.remove('show'); pendingClaimId=null; }
function finishClaim(){
  const item = listings.find(x=>String(x.id)===String(pendingClaimId));
  if(!item){ toast('Please select an item again.'); return closeClaimModal(); }
  const already = orders.find(o => String(o.id)===String(item.id) && o.username===currentUser.username);
  if(already){ closeClaimModal(); toast('This item is already in My Collections.'); go('ordersScreen'); return; }
  const order = {
    id:item.id, item:item.item, category:item.category, qty:item.qty, qtyLeft:item.qtyLeft, stall:item.stall,
    centre:item.centre, location:item.location, time:item.time, rating:item.rating, price:item.price,
    username: currentUser?.username || 'guest', status:'Confirmed', payment:selectedPayment || 'PayNow',
    claimCode:'HL-' + Math.floor(1000+Math.random()*9000), claimedAt:new Date().toLocaleString(),
    collectionNote:`Collect ${item.item} at ${item.location} during ${item.time}.`
  };
  orders = [order, ...orders];
  listings = listings.map(x => String(x.id)===String(item.id) ? {...x, qtyLeft: Math.max(0, (Number(x.qtyLeft)||1)-1)} : x);
  saveAll(); closeClaimModal(); renderListings(document.querySelector('.chip.active')?.dataset.filter || 'all'); renderOrders();
  toast(`Claim saved! Code: ${order.claimCode}`); go('ordersScreen');
}

function renderOrders(){
  const myUsername = currentUser?.username || 'guest';
  const myOrders = orders.filter(o => o && o.item && (!o.username || o.username===myUsername));
  $('ordersList').innerHTML = myOrders.map(o=>`
    <article class="listing-card collection-confirmed">
      <div class="listing-head"><div><h3>${o.item}</h3><p class="small-note">${o.stall} • ${o.centre}</p></div><span class="tag">${o.status || 'Confirmed'}</span></div>
      <div class="meta">
        <div><small>Quantity</small><b>${o.qty || '1 available pack'}</b></div>
        <div><small>Price</small><b>${o.price || 'Free'}</b></div>
        <div><small>Collection time</small><b>${o.time}</b></div>
        <div><small>Pickup point</small><b>${o.location}</b></div>
        <div class="meta-wide"><small>Payment method</small><b>${o.payment || 'PayNow'}</b></div>
      </div>
      <div class="claim-code-box"><span>Claim code</span><strong>${o.claimCode || 'HL-0000'}</strong></div>
      <p class="small-note">Show this claim code at the stall during the collection window.</p>
      <div class="collection-banner">✅ Collection confirmed. ${o.collectionNote || `Collect at ${o.location} during ${o.time}.`}</div>
    </article>`).join('') || `<div class="status-card">No claimed items yet. Go to Fresh Listings to claim food.</div>`;
}

function setMapToPasirRis(){
  $('mapFrame').src = 'https://www.google.com/maps?q=Pasir%20Ris%20hawker%20centre%20food%20court&z=13&output=embed';
  $('gpsStatus').textContent = 'Map set to Pasir Ris area with nearby hawker-centre shortcut icons.';
  renderCentres();
}
function renderCentres(){
  if($('mapPins')) $('mapPins').innerHTML = centres.map((c,i)=>`<button class="mini-pin" style="top:${c.top};left:${c.left}" title="${c.name}" onclick="focusCentre(${i})">${icon('stall')}</button>`).join('');
  $('centreList').innerHTML = centres.map((c,i)=>`
    <article class="centre-card"><div><h3>${c.name}</h3><p>${c.distance} away • ${c.note}</p></div><button class="secondary-btn" onclick="focusCentre(${i})">View</button></article>`).join('');
}
window.focusCentre = function(i){
  const c = centres[i];
  $('mapFrame').src = `https://www.google.com/maps?q=${encodeURIComponent(c.name + ' Singapore')}&z=15&output=embed`;
  $('gpsStatus').textContent = `Showing ${c.name} — approximately ${c.distance} from Pasir Ris area.`;
}
function renderFeedback(){
  $('feedbackList').innerHTML = feedback.map(f=>`<article class="feedback-card"><b>${'★'.repeat(Number(f.rating))}${'☆'.repeat(5-Number(f.rating))} ${f.stall}</b><p class="small-note">${f.comment}</p></article>`).join('') || `<div class="status-card">No feedback submitted yet.</div>`;
}
function renderProfile(){
  const extra = currentUser.role === 'hawker' ? `
    <div class="profile-row"><span>Stall</span><b>${currentUser.stallName || 'Not added'}</b></div>
    <div class="profile-row"><span>Centre</span><b>${currentUser.stallCentre || 'Not added'}</b></div>
    <div class="profile-row"><span>Certificate</span><b>${currentUser.certNo || 'Not added'}</b></div>
    <div class="profile-row"><span>Verification</span><b>${currentUser.verified ? 'Verified' : 'Pending'}</b></div>` : `<div class="profile-row"><span>Resident services</span><b>GPS, claiming, collection, payment, feedback</b></div>`;
  $('profileCard').innerHTML = `
    <div class="profile-row"><span>Name</span><b>${currentUser.name}</b></div>
    <div class="profile-row"><span>Username</span><b>@${currentUser.username}</b></div>
    <div class="profile-row"><span>Role</span><b>${currentUser.role}</b></div>${extra}`;
}

// Main navigation for static back buttons and auth tabs
document.querySelectorAll('[data-go]').forEach(btn=>btn.addEventListener('click',()=>go(btn.dataset.go)));
document.querySelectorAll('[data-auth-tab]').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('[data-auth-tab]').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  $('loginForm').classList.toggle('hidden', btn.dataset.authTab!=='login');
  $('signupForm').classList.toggle('hidden', btn.dataset.authTab!=='signup');
}));
$('signupRole').addEventListener('change', e=>$('hawkerSignupFields').classList.toggle('hidden', e.target.value!=='hawker'));

$('signupForm').addEventListener('submit', e=>{
  e.preventDefault();
  const role = $('signupRole').value;
  if(role==='hawker' && (!$('certNo').value || !$('certFile').value)){ toast('Hawkers must enter and upload a food hygiene certificate.'); return; }
  const username = $('signupUsername').value.trim().toLowerCase().replace(/\s+/g,'');
  if(username.length < 3){ toast('Username must be at least 3 characters.'); return; }
  if(users.some(u=>u.username===username)){ toast('This username already exists. Please login or choose another.'); return; }
  const user = { name:$('signupName').value.trim(), username, password:$('signupPassword').value, role,
    stallName:$('stallName').value.trim(), stallCentre:$('stallCentre').value.trim(), certNo:$('certNo').value.trim(), certFile:$('certFile').files[0]?.name || '', verified: role==='hawker' ? false : true };
  users.push(user); currentUser = user; saveAll(); toast('Account created and remembered.'); go('homeScreen');
});
$('loginForm').addEventListener('submit', e=>{
  e.preventDefault();
  const username = $('loginUsername').value.trim().toLowerCase().replace(/\s+/g,'');
  const user = users.find(u=>u.username===username && u.password===$('loginPassword').value);
  if(!user){ toast('Login failed. Check username/password or sign up first.'); return; }
  currentUser = user; saveAll(); toast('Welcome back!'); go('homeScreen');
});
$('logoutBtn').addEventListener('click',()=>{currentUser=null; localStorage.removeItem('hawkerlink_v7_currentUser'); bottomNav.classList.remove('show'); go('authScreen');});
document.querySelectorAll('.chip').forEach(chip=>chip.addEventListener('click',()=>{document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));chip.classList.add('active');renderListings(chip.dataset.filter);}));

$('gpsBtn').addEventListener('click',()=>{
  $('gpsStatus').textContent='Requesting GPS permission...';
  if(!navigator.geolocation){ $('gpsStatus').textContent='GPS is not supported in this browser. Showing Pasir Ris by default.'; setMapToPasirRis(); return; }
  navigator.geolocation.getCurrentPosition(pos=>{
    const {latitude, longitude}=pos.coords;
    $('mapFrame').src = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    $('gpsStatus').textContent=`GPS detected: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}. Tap the nearby hawker icons/list below for demo centres around Pasir Ris.`;
  },()=>{ $('gpsStatus').textContent='GPS permission was blocked. Showing Pasir Ris by default.'; setMapToPasirRis(); });
});
$('pasirRisBtn').addEventListener('click', setMapToPasirRis);
$('openMapBtn').addEventListener('click',()=> window.open('https://www.google.com/maps/search/?api=1&query=hawker+centre+near+Pasir+Ris+Singapore','_blank'));
$('listingContainer').addEventListener('click', (e)=>{ const btn = e.target.closest('.claim-btn'); if(btn) openClaimModal(btn.dataset.claimId); });

document.querySelectorAll('.payment-option').forEach(btn=>btn.addEventListener('click',()=>{ selectedPayment = btn.dataset.payment; document.querySelectorAll('.payment-option').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }));
$('cancelClaim').addEventListener('click', closeClaimModal);
$('confirmClaim').addEventListener('click', finishClaim);
$('claimModal').addEventListener('click', e=>{ if(e.target.id==='claimModal') closeClaimModal(); });

$('verifyForm').addEventListener('submit', e=>{
  e.preventDefault();
  currentUser.stallName=$('verifyStall').value.trim(); currentUser.certNo=$('verifyCert').value.trim(); currentUser.certExpiry=$('verifyExpiry').value; currentUser.certFile=$('verifyFile').files[0]?.name || currentUser.certFile; currentUser.verified=true;
  users = users.map(u=>u.username===currentUser.username ? currentUser : u); saveAll();
  $('verifyResult').classList.remove('hidden'); $('verifyResult').innerHTML='✅ Verification submitted successfully. For this prototype, your stall is now marked as verified.'; toast('Verification saved.');
});
$('addListingForm').addEventListener('submit', e=>{
  e.preventDefault();
  if(currentUser.role==='hawker' && !currentUser.verified){ toast('Please verify your hawker account first.'); go('verifyScreen'); return; }
  const qtyText = $('itemQty').value.trim();
  const qtyNum = Number(qtyText.match(/\d+/)?.[0] || 1);
  listings.unshift({ id:crypto.randomUUID(), item:$('itemName').value.trim(), category:$('itemCategory').value, qty:qtyText, qtyLeft:qtyNum, stall:currentUser.stallName || currentUser.name, centre:currentUser.stallCentre || 'Pasir Ris Central Hawker Centre', location:$('itemLocation').value.trim(), time:$('itemTime').value.trim(), rating:'New', price:$('itemPrice').value.trim() || 'Free' });
  saveAll(); e.target.reset(); toast('Listing published with pricing.'); go('listingsScreen');
});
$('feedbackForm').addEventListener('submit', e=>{
  e.preventDefault();
  feedback.unshift({ stall:$('fbStall').value.trim(), rating:$('fbRating').value, comment:$('fbComment').value.trim() });
  saveAll(); e.target.reset(); renderFeedback(); toast('Feedback submitted.');
});

saveAll(); renderCentres(); if(currentUser){ go('homeScreen'); } else { go('authScreen'); }
