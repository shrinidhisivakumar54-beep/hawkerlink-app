import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgOq78q8S56ZX8Ly686OcO_Up281gjEuw",
  authDomain: "hawkerlink-8644d.firebaseapp.com",
  projectId: "hawkerlink-8644d",
  storageBucket: "hawkerlink-8644d.firebasestorage.app",
  messagingSenderId: "396709230526",
  appId: "1:396709230526:web:b3e7be45e62ddd3fc6ebef",
  measurementId: "G-Y4T4BFCYQ5"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const KEY = 'hawkerlink_v24_original_';
const PASIR_RIS = { lat: 1.37335, lng: 103.94935, name: 'Pasir Ris Central Hawker Centre', address:'182 Pasir Ris Central, Singapore 519207' };
const NEARBY_HAWKERS = [
  { name:'Pasir Ris Central Hawker Centre', address:'182 Pasir Ris Central, Singapore 519207', lat:1.37335, lng:103.94935 },
  { name:'Tampines Round Market & Food Centre', address:'137 Tampines Street 11, Singapore 521137', lat:1.34580, lng:103.94443 },
  { name:'Our Tampines Hub Hawker Centre', address:'1 Tampines Walk, Singapore 528523', lat:1.35245, lng:103.94078 },
  { name:'Changi Village Hawker Centre', address:'2 Changi Village Road, Singapore 500002', lat:1.38900, lng:103.98718 },
  { name:'Bedok 85 Fengshan Food Centre', address:'85 Bedok North Street 4, Singapore 460085', lat:1.33185, lng:103.93831 }
];
const SLOT_OPTIONS = ['Today, 9 AM – 10 AM','Today, 10 AM – 11 AM','Today, 12 PM – 1 PM','Today, 2 PM – 3 PM','Today, 4 PM – 5 PM','Today, 5 PM – 6 PM','Today, 6 PM – 7 PM','Today, 7 PM – 8 PM','Tomorrow, 9 AM – 10 AM','Tomorrow, 12 PM – 1 PM','Tomorrow, 6 PM – 7 PM'];
const $ = id => document.getElementById(id);
const screens = [...document.querySelectorAll('.screen')];
let map, userMarker, selectedPayment = 'PayNow', pendingClaimId = null, mapMarkers = [];

const icons = {
  home:`<svg viewBox="0 0 64 64"><path d="M13 36c9-4 15-5 20-1 4 4 8 11 18 9M18 16c10 1 15 7 14 18M46 13c0 11-6 17-17 17M14 44c5 9 18 10 26 3 8-7 9-20 1-28"/></svg>`,
  basket:`<svg viewBox="0 0 64 64"><path d="M18 28h34l-4 27H22l-4-27Z"/><path d="M25 28c0-10 5-18 14-18s14 8 14 18"/><path d="M26 38h18M28 46h14M15 28h40"/><path d="M45 15c7 0 12-4 13-10 6 9 1 16-10 18"/></svg>`,
  map:`<svg viewBox="0 0 64 64"><path d="M10 18l14-6 16 6 14-6v40l-14 6-16-6-14 6V18Z"/><path d="M24 12v40M40 18v40"/><path d="M46 19c0 7-8 15-8 15s-8-8-8-15a8 8 0 0 1 16 0Z"/><circle cx="38" cy="19" r="2.5"/></svg>`,
  collect:`<svg viewBox="0 0 64 64"><path d="M18 26h26l-3 26H21l-3-26Z"/><path d="M24 26c0-8 4-14 9-14s9 6 9 14"/><path d="M42 37l5 5 10-12"/></svg>`,
  feedback:`<svg viewBox="0 0 64 64"><path d="M9 15h28a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8H24l-12 9v-9H9a8 8 0 0 1-8-8V23a8 8 0 0 1 8-8Z"/><path d="M47 12h8a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7h-2v8l-9-7"/><path d="M21 35h12M16 30l3-9h4v8h8a4 4 0 0 1 0 8h-9"/><path d="M51 19l2 4 4 .5-3 3 .8 4-3.8-2-3.8 2 .8-4-3-3 4-.5 2-4Z"/></svg>`,
  profile:`<svg viewBox="0 0 64 64"><circle cx="32" cy="24" r="12"/><path d="M12 56c3-13 12-20 20-20s17 7 20 20"/><circle cx="32" cy="32" r="28"/></svg>`,
  search:`<svg viewBox="0 0 64 64"><circle cx="28" cy="28" r="18"/><path d="M42 42l14 14"/></svg>`,
  pin:`<svg viewBox="0 0 64 64"><path d="M50 26c0 16-18 32-18 32S14 42 14 26a18 18 0 1 1 36 0Z"/><circle cx="32" cy="26" r="6"/></svg>`,
  target:`<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="16"/><circle cx="32" cy="32" r="5"/><path d="M32 5v11M32 48v11M5 32h11M48 32h11"/></svg>`,
  list:`<svg viewBox="0 0 64 64"><path d="M16 18h36M16 32h36M16 46h36"/><circle cx="8" cy="18" r="2"/><circle cx="8" cy="32" r="2"/><circle cx="8" cy="46" r="2"/></svg>`,
  verify:`<svg viewBox="0 0 64 64"><path d="M12 10h32l10 10v42H12V10Z"/><path d="M44 10v12h12"/><path d="M21 36l8 8 15-18"/></svg>`
};
function drawIcons(){ document.querySelectorAll('[data-icon]').forEach(el => el.innerHTML = icons[el.dataset.icon] || ''); }
function getStored(name, fallback){ try { const raw = localStorage.getItem(KEY + name); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; } }
function setStored(name, val){ localStorage.setItem(KEY + name, JSON.stringify(val)); }
function toast(msg){ $('toast').textContent = msg; $('toast').classList.remove('hidden'); setTimeout(()=> $('toast').classList.add('hidden'), 2300); }
function esc(str=''){ return String(str).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function makeUsernameFromEmail(email){ const base = (email.split('@')[0] || 'user').toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,18) || 'user'; let name = base; let i = 1; while(users.some(u => u.username === name)){ name = `${base}${i++}`; } return name; }

let users = getStored('users', [

]);
let currentUser = getStored('currentUser', null);
let listings = getStored('listings', [
  { id:'L1', item:'Spinach bundles', category:'vegetables', stall:'Ah Lim Vegetables', centre:'Pasir Ris Central Hawker Centre', qtyLeft:8, maxPerUser:2, price:'Free', location:'Stall #02-14', slots:['Today, 4 PM – 5 PM','Today, 5 PM – 6 PM','Today, 6 PM – 7 PM'], createdBy:'hawker' },
  { id:'L2', item:'Tomato and carrot packs', category:'vegetables', stall:'Fresh Basket Corner', centre:'Pasir Ris Central Hawker Centre', qtyLeft:6, maxPerUser:1, price:'$1.00', location:'Stall #01-08', slots:['Today, 6 PM – 7 PM','Today, 7 PM – 8 PM','Tomorrow, 9 AM – 10 AM'], createdBy:'hawker' },
  { id:'L3', item:'Banana bunches', category:'fruit', stall:'Kampong Fruit Stall', centre:'Pasir Ris Central Hawker Centre', qtyLeft:10, maxPerUser:2, price:'Pay what you can', location:'Stall #01-22', slots:['Today, 5 PM – 6 PM','Today, 7 PM – 8 PM'], createdBy:'hawker' },
  { id:'L4', item:'Vegetarian rice boxes', category:'meals', stall:'Warm Plate Kitchen', centre:'Pasir Ris Central Hawker Centre', qtyLeft:4, maxPerUser:1, price:'Free', location:'Stall #02-02', slots:['Today, 7 PM – 8 PM','Tomorrow, 12 PM – 1 PM'], createdBy:'hawker' }
]);
let orders = getStored('orders', []);
let feedback = getStored('feedback', [
  { id:'F1', stall:'Ah Lim Vegetables', item:'Spinach bundles', stars:5, text:'Fresh vegetables and smooth collection. The stall auntie was very kind.', username:'resident', date:'Today', photo:'' },
  { id:'F2', stall:'Fresh Basket Corner', item:'Tomato and carrot packs', stars:4, text:'Good condition and clear pickup instructions.', username:'resident', date:'Yesterday', photo:'' }
]);
let suspensions = getStored('suspensions', {});
function save(){ if(currentUser){ users = users.map(u => u.username === currentUser.username ? {...u, ...currentUser} : u); } setStored('users', users); setStored('currentUser', currentUser); setStored('listings', listings); setStored('orders', orders); setStored('feedback', feedback); setStored('suspensions', suspensions); setStored('stallReports', stallReports); }

const I18N = {
  en:{tagline:'Community Food Rescue',intro:'Connects verified hawkers with nearby residents so fresh surplus food can be collected safely instead of wasted.',login:'Log in',signup:'Sign up',username:'Email',password:'Password',fullName:'Full name',contact:'Email',emailVerificationHelp:'No 6-digit code is needed. After you click Create account, Firebase will send a verification link to your email. Check Inbox first, then Spam/Junk if it is not there.',sendCode:'Send code',accountType:'Account type',resident:'Resident',hawker:'Hawker',stallName:'Stall name',hawkerCentre:'Hawker centre',certNo:'Food hygiene certificate no.',createAccount:'Create account',logout:'Log out',back:'Back',hi:'Hi',lessWaste:'Less waste, more care',heroTitle:'Share fresh surplus food with the community.',heroDesc:'Browse listings, check stall feedback, collect safely, and support local hawkers.',home:'Home',map:'Map',collect:'Collect',feedback:'Feedback',profile:'Profile',list:'List',verify:'Verify',residentAccount:'Resident account',hawkerAccount:'Hawker account',verifyStall:'Verify Stall',verifyStallDesc:'Submit hygiene certificate and stall details.',addListing:'Add Listing',addListingDesc:'Create a clean surplus-food listing.',nearbyMap:'Nearby Map',nearbyMapDesc:'Use GPS or reset to Pasir Ris.',profileDesc:'View account, language and favourite stalls.',freshListings:'Fresh Listings',freshListingsDesc:'Search listings and view feedback under each stall.',mapDesc:'Find nearby hawker centres around Pasir Ris.',myCollections:'My Collections',myCollectionsDesc:'Track claim codes and slots.',feedbackDesc:'Rate stalls after collection.',listingsEyebrow:'Fresh surplus nearby',search:'Search by food, stall, centre, price...',clear:'Clear',all:'All',vegetables:'Vegetables',fruit:'Fruit',meals:'Meals',favourites:'Favourite stalls',noFav:'No favourite stalls yet.',addFav:'Save favourite',removeFav:'Saved',addedFav:'Added to favourites',removedFav:'Removed from favourites',newRating:'New',qtyLeft:'left',seeFeedback:'See feedback for this stall',review:'review',reviews:'reviews',noFeedback:'No feedback yet. Claim and review this stall after collection.',claimListing:'Claim this listing',noListings:'No matching listings. Try another search word or category.',hawkerTools:'Hawker tools',itemName:'Item name',category:'Category',quantity:'Quantity',maxResident:'Max / resident',priceNote:'Price or payment note',pickupLocation:'Pickup location',collectionSlots:'Collection slots',slotHelp:'Tick every timing you are free for residents to collect. You can choose more than one.',publish:'Publish listing',published:'Listing published',mapSearch:'Search hawker centres or locations',currentPasirRis:'Current location: Pasir Ris, Singapore',resetPasirRis:'Reset to Pasir Ris',useGps:'Use my real GPS',openMaps:'Open in Maps',mapNote:'Default is Pasir Ris Central Hawker Centre. Nearby hawker centres are shown below and on the map.',selectedLocation:'Selected location',gpsLoading:'Getting your GPS location...',gpsFar:'Your browser returned a location away from Pasir Ris. This can happen because of cached browser GPS or Wi-Fi location. Tap Reset to Pasir Ris for this project demo.',gpsFail:'GPS permission failed or browser gave an unreliable location. Defaulting to Pasir Ris Central Hawker Centre.',gpsUnsupported:'GPS is not supported by this browser',gpsUpdated:'GPS updated',nearbyCentres:'Nearby hawker centres',confirmed:'Confirmed',noCollections:'No collections yet. Claim a listing first.',qty:'Qty',payment:'Payment',claimCode:'Claim code',residentFeedback:'Resident feedback',claimedItem:'Claimed item',rating:'Rating',feedbackLabel:'Feedback',feedbackPlaceholder:'Share freshness, pickup experience, or communication...',uploadProof:'Upload proof/photo if needed',reportIssue:'Report serious issue / no-show',submitFeedback:'Submit feedback',noClaimed:'No claimed items yet',claimBeforeFeedback:'Claim an item before giving feedback',feedbackSubmitted:'Feedback submitted',compliance:'Compliance',verification:'Hawker Verification',expiry:'Certificate expiry date',uploadCert:'Upload certificate',submitVerification:'Submit verification',verificationSaved:'Verification saved',verificationMsg:'Verification saved for this demo. Your hawker account is now marked verified.',name:'Name',account:'Account',language:'Language',contactVerified:'Contact verified',yes:'Yes',stall:'Stall',hygieneCert:'Hygiene cert',verified:'Verified',pending:'Pending',saveLangHelp:'This saves your preferred display language for your account.',saved:'Language saved',confirmCollection:'Confirm Collection',confirmClaim:'Confirm claim',paymentMode:'Payment mode',invalidLogin:'Invalid username or password',duplicateUser:'Username already exists',duplicateContact:'This email or phone is already used',enterCode:'Enter demo code 123456',passwordMin:'Password must be at least 6 characters',claimSuccess:'Collection confirmed'},
  zh:{tagline:'社区食物共享',intro:'连接已认证摊贩和附近居民，让新鲜剩余食物安全领取，减少浪费。',login:'登录',signup:'注册',username:'用户名',password:'密码',fullName:'姓名',contact:'电邮',emailVerificationHelp:'不需要输入 6 位验证码。点击创建账号后，Firebase 会发送验证链接到你的电邮。请先检查收件箱，再检查垃圾邮件。',sendCode:'发送验证码',accountType:'账号类型',resident:'居民',hawker:'摊贩',stallName:'摊位名称',hawkerCentre:'熟食中心',certNo:'食物卫生证书编号',createAccount:'创建账号',logout:'退出',back:'返回',hi:'你好',lessWaste:'减少浪费，多一点关怀',heroTitle:'把新鲜剩余食物分享给社区。',heroDesc:'浏览列表、查看摊位反馈、安全领取，并支持本地摊贩。',home:'首页',map:'地图',collect:'领取',feedback:'反馈',profile:'个人资料',list:'上架',verify:'认证',residentAccount:'居民账号',hawkerAccount:'摊贩账号',verifyStall:'认证摊位',verifyStallDesc:'提交卫生证书和摊位资料。',addListing:'新增列表',addListingDesc:'发布清楚的剩余食物列表。',nearbyMap:'附近地图',nearbyMapDesc:'使用 GPS 或重置到白沙。',profileDesc:'查看账号、语言和收藏摊位。',freshListings:'新鲜列表',freshListingsDesc:'搜索列表，并在每个摊位下查看反馈。',mapDesc:'查看白沙附近的熟食中心。',myCollections:'我的领取',myCollectionsDesc:'查看领取码和时段。',feedbackDesc:'领取后为摊位评分。',listingsEyebrow:'附近新鲜剩余食物',search:'搜索食物、摊位、地点或价格...',clear:'清除',all:'全部',vegetables:'蔬菜',fruit:'水果',meals:'熟食',favourites:'收藏摊位',noFav:'还没有收藏摊位。',addFav:'收藏',removeFav:'已收藏',addedFav:'已加入收藏',removedFav:'已取消收藏',newRating:'暂无',qtyLeft:'剩余',seeFeedback:'查看此摊位反馈',review:'条评价',reviews:'条评价',noFeedback:'还没有反馈。领取后可评价此摊位。',claimListing:'领取这个列表',noListings:'没有符合的列表。试试其他关键词或类别。',hawkerTools:'摊贩工具',itemName:'食物名称',category:'类别',quantity:'数量',maxResident:'每位居民最多',priceNote:'价格或付款说明',pickupLocation:'领取地点',collectionSlots:'领取时段',slotHelp:'勾选你方便让居民领取的所有时段，可选择多个。',publish:'发布列表',published:'列表已发布',mapSearch:'搜索熟食中心或地点',currentPasirRis:'当前位置：白沙，新加坡',resetPasirRis:'重置到白沙',useGps:'使用我的真实 GPS',openMaps:'在地图打开',mapNote:'默认地点是白沙中央熟食中心，附近熟食中心会显示在地图和下方。',selectedLocation:'已选择地点',gpsLoading:'正在获取 GPS 位置...',gpsFar:'浏览器返回的位置不在白沙附近，可能是缓存或 Wi‑Fi 定位不准确。点击重置到白沙。',gpsFail:'GPS 权限失败或位置不可靠，已默认到白沙中央熟食中心。',gpsUnsupported:'此浏览器不支持 GPS',gpsUpdated:'GPS 已更新',nearbyCentres:'附近熟食中心',confirmed:'已确认',noCollections:'还没有领取记录。请先领取一个列表。',qty:'数量',payment:'付款',claimCode:'领取码',residentFeedback:'居民反馈',claimedItem:'已领取项目',rating:'评分',feedbackLabel:'反馈',feedbackPlaceholder:'分享新鲜度、领取体验或沟通情况...',uploadProof:'需要时上传照片证明',reportIssue:'举报严重问题 / 爽约',submitFeedback:'提交反馈',noClaimed:'还没有已领取项目',claimBeforeFeedback:'请先领取项目再提交反馈',feedbackSubmitted:'反馈已提交',compliance:'合规',verification:'摊贩认证',expiry:'证书到期日',uploadCert:'上传证书',submitVerification:'提交认证',verificationSaved:'认证已保存',verificationMsg:'认证已保存为演示。你的摊贩账号已标记为认证。',name:'姓名',account:'账号',language:'语言',contactVerified:'联系方式已验证',yes:'是',stall:'摊位',hygieneCert:'卫生证书',verified:'已认证',pending:'待处理',saveLangHelp:'系统会为你的账号保存此显示语言。',saved:'语言已保存',confirmCollection:'确认领取',confirmClaim:'确认领取',paymentMode:'付款方式',invalidLogin:'用户名或密码错误',duplicateUser:'用户名已存在',duplicateContact:'电邮或电话已被使用',enterCode:'请输入验证码 123456',passwordMin:'密码至少 6 个字符',claimSuccess:'领取已确认'},
  ta:{tagline:'சமூக உணவு பகிர்வு',intro:'Verified hawkers மற்றும் அருகிலுள்ள residents-ஐ இணைத்து surplus உணவை பாதுகாப்பாக collect செய்ய உதவும்.',login:'உள்நுழை',signup:'பதிவு செய்',username:'பயனர் பெயர்',password:'கடவுச்சொல்',fullName:'முழுப் பெயர்',contact:'மின்னஞ்சல்',emailVerificationHelp:'6 இலக்க code தேவையில்லை. Create account அழுத்திய பிறகு Firebase உங்கள் மின்னஞ்சலுக்கு verification link அனுப்பும். முதலில் Inbox பார்க்கவும்; இல்லையெனில் Spam/Junk பார்க்கவும்.',sendCode:'குறியீடு அனுப்பு',accountType:'கணக்கு வகை',resident:'Resident',hawker:'Hawker',stallName:'கடை பெயர்',hawkerCentre:'Hawker centre',certNo:'Food hygiene certificate எண்',createAccount:'கணக்கு உருவாக்கு',logout:'வெளியேறு',back:'பின்',hi:'வணக்கம்',lessWaste:'குறைந்த வீணாக்கம், அதிக அக்கறை',heroTitle:'புதிய surplus உணவை community உடன் பகிருங்கள்.',heroDesc:'Listings பார்க்கவும், stall feedback சரிபார்க்கவும், பாதுகாப்பாக collect செய்யவும்.',home:'முகப்பு',map:'வரைபடம்',collect:'பெறுதல்',feedback:'கருத்து',profile:'சுயவிவரம்',list:'பட்டியல்',verify:'சரிபார்',residentAccount:'Resident கணக்கு',hawkerAccount:'Hawker கணக்கு',verifyStall:'Stall சரிபார்ப்பு',verifyStallDesc:'Hygiene certificate மற்றும் stall விவரங்களை சமர்ப்பிக்கவும்.',addListing:'Listing சேர்க்க',addListingDesc:'Surplus-food listing உருவாக்கவும்.',nearbyMap:'அருகிலுள்ள வரைபடம்',nearbyMapDesc:'GPS பயன்படுத்தவும் அல்லது Pasir Ris-க்கு reset செய்யவும்.',profileDesc:'Account, language மற்றும் favourite stalls பார்க்கவும்.',freshListings:'Fresh Listings',freshListingsDesc:'Listings தேடி, ஒவ்வொரு stall கீழும் feedback பார்க்கவும்.',mapDesc:'Pasir Ris அருகிலுள்ள hawker centres பார்க்கவும்.',myCollections:'என் Collections',myCollectionsDesc:'Claim codes மற்றும் slots பார்க்கவும்.',feedbackDesc:'Collect செய்த பின் stall-ஐ rate செய்யவும்.',listingsEyebrow:'அருகிலுள்ள surplus உணவு',search:'உணவு, கடை, இடம், விலை தேடுங்கள்...',clear:'Clear',all:'அனைத்தும்',vegetables:'காய்கறி',fruit:'பழம்',meals:'உணவு',favourites:'பிடித்த கடைகள்',noFav:'இன்னும் பிடித்த கடைகள் இல்லை.',addFav:'பிடித்ததாக சேமி',removeFav:'சேமிக்கப்பட்டது',addedFav:'பிடித்ததாக சேர்க்கப்பட்டது',removedFav:'பிடித்ததில் இருந்து நீக்கப்பட்டது',newRating:'புதியது',qtyLeft:'மீதம்',seeFeedback:'இந்த stall feedback பார்க்க',review:'review',reviews:'reviews',noFeedback:'இன்னும் feedback இல்லை. Collect செய்த பின் review செய்யலாம்.',claimListing:'இந்த listing claim செய்',noListings:'பொருந்தும் listings இல்லை. வேறு search word முயற்சி செய்யுங்கள்.',hawkerTools:'Hawker tools',itemName:'Item பெயர்',category:'Category',quantity:'Quantity',maxResident:'ஒரு resident-க்கு அதிகபட்சம்',priceNote:'Price / payment note',pickupLocation:'Pickup location',collectionSlots:'Collection slots',slotHelp:'Residents collect செய்ய நீங்கள் free இருக்கும் நேரங்களை tick செய்யுங்கள். ஒன்றுக்கு மேல் தேர்வு செய்யலாம்.',publish:'Listing publish செய்',published:'Listing published',mapSearch:'Hawker centres அல்லது locations தேடுங்கள்',currentPasirRis:'Current location: Pasir Ris, Singapore',resetPasirRis:'Pasir Ris-க்கு reset செய்',useGps:'என் real GPS பயன்படுத்து',openMaps:'Maps-ல் திற',mapNote:'Default Pasir Ris Central Hawker Centre. Nearby hawker centres map-ல் காட்டப்படும்.',selectedLocation:'தேர்ந்தெடுத்த இடம்',gpsLoading:'GPS location பெறுகிறது...',gpsFar:'Browser Pasir Ris-இல் இல்லாத location கொடுத்தது. Reset to Pasir Ris அழுத்தவும்.',gpsFail:'GPS permission failed அல்லது unreliable location. Pasir Ris Central Hawker Centre-க்கு default செய்கிறது.',gpsUnsupported:'இந்த browser GPS support செய்யவில்லை',gpsUpdated:'GPS update ஆனது',nearbyCentres:'Nearby hawker centres',confirmed:'Confirmed',noCollections:'இன்னும் collections இல்லை. முதலில் listing claim செய்யுங்கள்.',qty:'Qty',payment:'Payment',claimCode:'Claim code',residentFeedback:'Resident feedback',claimedItem:'Claimed item',rating:'Rating',feedbackLabel:'Feedback',feedbackPlaceholder:'Freshness, pickup experience அல்லது communication பற்றி எழுதுங்கள்...',uploadProof:'தேவையெனில் photo proof upload செய்',reportIssue:'Serious issue / no-show report செய்',submitFeedback:'Feedback submit செய்',noClaimed:'Claimed items இல்லை',claimBeforeFeedback:'Feedback கொடுக்க முன் ஒரு item claim செய்யவும்',feedbackSubmitted:'Feedback submitted',compliance:'Compliance',verification:'Hawker Verification',expiry:'Certificate expiry date',uploadCert:'Certificate upload செய்',submitVerification:'Verification submit செய்',verificationSaved:'Verification saved',verificationMsg:'Demo-க்கு verification save செய்யப்பட்டது. உங்கள் hawker account verified என்று mark செய்யப்பட்டது.',name:'பெயர்',account:'கணக்கு',language:'மொழி',contactVerified:'Contact verified',yes:'ஆம்',stall:'Stall',hygieneCert:'Hygiene cert',verified:'Verified',pending:'Pending',saveLangHelp:'இந்த மொழி உங்கள் account-க்கு save செய்யப்படும்.',saved:'மொழி சேமிக்கப்பட்டது',confirmCollection:'Collection confirm செய்',confirmClaim:'Claim confirm செய்',paymentMode:'Payment mode',invalidLogin:'Username அல்லது password தவறு',duplicateUser:'Username ஏற்கனவே உள்ளது',duplicateContact:'Email/phone ஏற்கனவே பயன்படுத்தப்பட்டது',enterCode:'Demo code 123456 இடுங்கள்',passwordMin:'Password குறைந்தது 6 characters வேண்டும்',claimSuccess:'Collection confirmed'}
};

// v16 translation cleanup + new claim/report actions
Object.assign(I18N.en, {
  collectionQueue:'Collection Queue', collectionQueueDesc:'View resident claims and mark no-shows from the hawker side.',
  cancelClaim:'Cancel claim', claimCancelled:'Claim cancelled', cancelled:'Cancelled', active:'Active', status:'Status',
  noVegFound:'No vegetables available', noVegReport:'Report no vegetables found', noVegReported:'Report submitted to the hawker record',
  hawkerNoShow:'Mark resident no-show', noShowMarked:'Resident no-show recorded', incomingClaims:'Incoming Claims', noIncomingClaims:'No incoming claims yet.',
  residentName:'Resident', reportIssue:'Report issue / no vegetables available', reportIssueHelp:'Use this only if the stall had no vegetables available, the listing was inaccurate, or you need to show proof.'
});
Object.assign(I18N.zh, {
  collectionQueue:'领取队列', collectionQueueDesc:'查看居民领取记录，并由摊贩标记爽约。',
  cancelClaim:'取消领取', claimCancelled:'领取已取消', cancelled:'已取消', active:'进行中', status:'状态',
  noVegFound:'没有可领取蔬菜', noVegReport:'举报没有蔬菜可领取', noVegReported:'举报已提交到摊贩记录',
  hawkerNoShow:'标记居民爽约', noShowMarked:'已记录居民爽约', incomingClaims:'领取记录', noIncomingClaims:'暂无居民领取记录。',
  residentName:'居民', reportIssue:'举报问题 / 没有蔬菜可领取', reportIssueHelp:'如果摊位没有蔬菜、列表不准确，或需要上传证明，请使用此选项。'
});
Object.assign(I18N.ta, {
  tagline:'சமூக உணவு மீட்பு', intro:'சரிபார்க்கப்பட்ட கடைக்காரர்களையும் அருகிலுள்ள குடியிருப்பாளர்களையும் இணைத்து, மீதமான புதிய உணவை பாதுகாப்பாக பெற உதவும்.',
  login:'உள்நுழை', signup:'பதிவு செய்', username:'பயனர் பெயர்', password:'கடவுச்சொல்', fullName:'முழுப் பெயர்', contact:'மின்னஞ்சல் அல்லது தொலைபேசி', sendCode:'குறியீடு அனுப்பு', accountType:'கணக்கு வகை', resident:'குடியிருப்பாளர்', hawker:'கடைக்காரர்', stallName:'கடை பெயர்', hawkerCentre:'உணவகம் மையம்', certNo:'உணவு சுகாதாரச் சான்று எண்', createAccount:'கணக்கு உருவாக்கு', logout:'வெளியேறு', back:'பின் செல்', hi:'வணக்கம்',
  lessWaste:'வீணாக்கம் குறைவு, அக்கறை அதிகம்', heroTitle:'மீதமான புதிய உணவை சமூகத்துடன் பகிருங்கள்.', heroDesc:'பட்டியல்களைப் பாருங்கள், கடை கருத்துகளைச் சரிபாருங்கள், பாதுகாப்பாகப் பெறுங்கள்.',
  home:'முகப்பு', map:'வரைபடம்', collect:'பெறுதல்', feedback:'கருத்து', profile:'சுயவிவரம்', list:'பட்டியல்', verify:'சரிபார்ப்பு', residentAccount:'குடியிருப்பாளர் கணக்கு', hawkerAccount:'கடைக்காரர் கணக்கு',
  verifyStall:'கடை சரிபார்ப்பு', verifyStallDesc:'சுகாதாரச் சான்று மற்றும் கடை விவரங்களைச் சமர்ப்பிக்கவும்.', addListing:'புதிய பட்டியல்', addListingDesc:'மீதமான உணவுக்கான தெளிவான பட்டியலை உருவாக்கவும்.', nearbyMap:'அருகிலுள்ள வரைபடம்', nearbyMapDesc:'GPS பயன்படுத்தவும் அல்லது பாசிர் ரிஸுக்கு மீட்டமைக்கவும்.', profileDesc:'கணக்கு, மொழி, பிடித்த கடைகள் பார்க்கவும்.',
  freshListings:'புதிய பட்டியல்கள்', freshListingsDesc:'பட்டியல்களைத் தேடி ஒவ்வொரு கடைக்குக் கீழும் கருத்துகளைப் பார்க்கவும்.', mapDesc:'பாசிர் ரிஸ் அருகிலுள்ள உணவகம் மையங்களைப் பார்க்கவும்.', myCollections:'என் பெறுதல்கள்', myCollectionsDesc:'பெறுதல் குறியீடுகள் மற்றும் நேரங்களைப் பார்க்கவும்.', feedbackDesc:'பெற்ற பின் கடைக்கு மதிப்பீடு அளிக்கவும்.',
  listingsEyebrow:'அருகிலுள்ள புதிய மீத உணவு', search:'உணவு, கடை, மையம், விலை தேடுங்கள்...', clear:'அழி', all:'அனைத்தும்', vegetables:'காய்கறிகள்', fruit:'பழங்கள்', meals:'உணவுகள்', favourites:'பிடித்த கடைகள்', noFav:'இன்னும் பிடித்த கடைகள் இல்லை.', addFav:'பிடித்ததாக சேமி', removeFav:'சேமிக்கப்பட்டது', addedFav:'பிடித்ததாக சேர்க்கப்பட்டது', removedFav:'பிடித்ததில் இருந்து நீக்கப்பட்டது',
  newRating:'புதியது', qtyLeft:'மீதம்', seeFeedback:'இந்தக் கடையின் கருத்துகள்', review:'கருத்து', reviews:'கருத்துகள்', noFeedback:'இன்னும் கருத்துகள் இல்லை. பெற்ற பின் கருத்து அளிக்கலாம்.', claimListing:'இந்தப் பட்டியலைப் பெறு', noListings:'பொருந்தும் பட்டியல்கள் இல்லை. வேறு சொல் அல்லது வகையை முயற்சிக்கவும்.',
  hawkerTools:'கடைக்காரர் கருவிகள்', itemName:'உணவு பெயர்', category:'வகை', quantity:'அளவு', maxResident:'ஒருவருக்கு அதிகபட்சம்', priceNote:'விலை அல்லது கட்டணம் குறிப்பு', pickupLocation:'பெறும் இடம்', collectionSlots:'பெறும் நேரங்கள்', slotHelp:'குடியிருப்பாளர்கள் பெற நீங்கள் கிடைக்கும் அனைத்து நேரங்களையும் தேர்வு செய்யுங்கள். ஒன்றுக்கு மேல் தேர்வு செய்யலாம்.', publish:'பட்டியலை வெளியிடு', published:'பட்டியல் வெளியிடப்பட்டது',
  mapSearch:'உணவகம் மையங்கள் அல்லது இடங்களைத் தேடுங்கள்', currentPasirRis:'தற்போதைய இடம்: பாசிர் ரிஸ், சிங்கப்பூர்', resetPasirRis:'பாசிர் ரிஸுக்கு மீட்டமை', useGps:'என் உண்மையான GPS பயன்படுத்து', openMaps:'வரைபடத்தில் திற', mapNote:'இயல்புநிலை பாசிர் ரிஸ் சென்ட்ரல் உணவகம் மையம். அருகிலுள்ள மையங்கள் வரைபடத்திலும் கீழேயும் காட்டப்படும்.', selectedLocation:'தேர்ந்தெடுத்த இடம்', gpsLoading:'GPS இடம் பெறப்படுகிறது...', gpsFar:'உலாவி பாசிர் ரிஸிலிருந்து தூரமான இடத்தை காட்டியது. இந்த மாதிரிக்காக பாசிர் ரிஸுக்கு மீட்டமைக்கவும்.', gpsFail:'GPS அனுமதி தோல்வியடைந்தது அல்லது இடம் நம்பகமில்லை. பாசிர் ரிஸுக்கு மாற்றப்பட்டது.', gpsUnsupported:'இந்த உலாவியில் GPS ஆதரவு இல்லை', gpsUpdated:'GPS புதுப்பிக்கப்பட்டது', nearbyCentres:'அருகிலுள்ள உணவகம் மையங்கள்',
  confirmed:'உறுதிசெய்யப்பட்டது', noCollections:'இன்னும் பெறுதல்கள் இல்லை. முதலில் ஒரு பட்டியலைப் பெறுங்கள்.', qty:'அளவு', payment:'கட்டணம்', claimCode:'பெறுதல் குறியீடு', residentFeedback:'குடியிருப்பாளர் கருத்து', claimedItem:'பெற்ற பொருள்', rating:'மதிப்பீடு', feedbackLabel:'கருத்து', feedbackPlaceholder:'புதிய தன்மை, பெறும் அனுபவம் அல்லது தொடர்பு பற்றி எழுதுங்கள்...', uploadProof:'தேவைப்பட்டால் புகைப்பட சான்றை பதிவேற்றவும்', reportIssue:'சிக்கல் / காய்கறிகள் இல்லை என்று புகார் செய்', reportIssueHelp:'கடைப் பகுதியில் காய்கறிகள் கிடைக்கவில்லை, பட்டியல் தவறு, அல்லது சான்று தேவைப்பட்டால் இதைப் பயன்படுத்தவும்.', submitFeedback:'கருத்தை சமர்ப்பி', noClaimed:'பெற்ற பொருட்கள் இல்லை', claimBeforeFeedback:'கருத்து அளிக்க முன் ஒரு பொருளைப் பெறுங்கள்', feedbackSubmitted:'கருத்து சமர்ப்பிக்கப்பட்டது',
  compliance:'ஒழுங்குபடுத்தல்', verification:'கடைக்காரர் சரிபார்ப்பு', expiry:'சான்று காலாவதி தேதி', uploadCert:'சான்றை பதிவேற்று', submitVerification:'சரிபார்ப்பை சமர்ப்பி', verificationSaved:'சரிபார்ப்பு சேமிக்கப்பட்டது', verificationMsg:'இந்த மாதிரிக்காக சரிபார்ப்பு சேமிக்கப்பட்டது. உங்கள் கடைக்காரர் கணக்கு சரிபார்க்கப்பட்டது.',
  name:'பெயர்', account:'கணக்கு', language:'மொழி', contactVerified:'தொடர்பு சரிபார்க்கப்பட்டது', yes:'ஆம்', stall:'கடை', hygieneCert:'சுகாதாரச் சான்று', verified:'சரிபார்க்கப்பட்டது', pending:'நிலுவையில்', saveLangHelp:'இந்த மொழி உங்கள் கணக்கில் சேமிக்கப்படும்.', saved:'மொழி சேமிக்கப்பட்டது', confirmCollection:'பெறுதலை உறுதிசெய்', confirmClaim:'பெறுதலை உறுதிசெய்', paymentMode:'கட்டண முறை', invalidLogin:'பயனர் பெயர் அல்லது கடவுச்சொல் தவறு', duplicateUser:'பயனர் பெயர் ஏற்கனவே உள்ளது', duplicateContact:'மின்னஞ்சல்/தொலைபேசி ஏற்கனவே பயன்படுத்தப்பட்டுள்ளது', enterCode:'மாதிரி குறியீடு 123456 உள்ளிடுங்கள்', passwordMin:'கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்', claimSuccess:'பெறுதல் உறுதிசெய்யப்பட்டது',
  collectionQueue:'பெறுதல் வரிசை', collectionQueueDesc:'குடியிருப்பாளர் பெறுதல்களைப் பார்த்து, வராதவர்களை கடைக்காரர் பக்கம் இருந்து குறிக்கவும்.', cancelClaim:'பெறுதலை ரத்து செய்', claimCancelled:'பெறுதல் ரத்து செய்யப்பட்டது', cancelled:'ரத்து செய்யப்பட்டது', active:'செயலில்', status:'நிலை', noVegFound:'காய்கறிகள் கிடைக்கவில்லை', noVegReport:'காய்கறிகள் இல்லை என்று புகார் செய்', noVegReported:'புகார் கடைக்காரர் பதிவில் சேர்க்கப்பட்டது', hawkerNoShow:'குடியிருப்பாளர் வரவில்லை என்று குறி', noShowMarked:'குடியிருப்பாளர் வராதது பதிவு செய்யப்பட்டது', incomingClaims:'வரும் பெறுதல்கள்', noIncomingClaims:'இன்னும் வரும் பெறுதல்கள் இல்லை.', residentName:'குடியிருப்பாளர்'
});
let stallReports = getStored('stallReports', []);

function lang(){ return currentUser?.language || 'en'; }
function t(key){ return (I18N[lang()] && I18N[lang()][key]) || I18N.en[key] || key; }


// v27 clearer signup display-name labels
Object.assign(I18N.en, { displayName:'Name shown in app', nameHelp:'This name appears on the home page and profile. Your email is only used for login and verification.' });
Object.assign(I18N.zh, { displayName:'应用显示名称', nameHelp:'这个名称会显示在首页和个人资料。电邮只用于登录和验证。' });
Object.assign(I18N.ta, { displayName:'App-ல் காட்டும் பெயர்', nameHelp:'இந்த பெயர் home page மற்றும் profile-ல் காட்டப்படும். Email login மற்றும் verification-க்கு மட்டும் பயன்படுத்தப்படும்.' });

function applyLanguage(){
  document.body.classList.toggle('tamil-mode', lang()==='ta');
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  if($('searchInput')) $('searchInput').placeholder = t('search');
  if($('mapSearch')) $('mapSearch').placeholder = t('mapSearch');
  if($('feedbackText')) $('feedbackText').placeholder = t('feedbackPlaceholder');
  if($('locationText')) $('locationText').textContent = t('currentPasirRis');
  if($('gpsStatus')) $('gpsStatus').textContent = t('mapNote');
  drawIcons();
}
function validPassword(p){ return String(p).length >= 6; }
function isSuspended(username){ return suspensions[username] && Date.now() < suspensions[username].until; }
function avgRating(stall){ const fs = feedback.filter(f => f.stall === stall); return fs.length ? (fs.reduce((a,b)=>a+Number(b.stars),0)/fs.length).toFixed(1) : null; }
function stallFeedback(stall){ return feedback.filter(f => f.stall === stall).slice(-3).reverse(); }
function favs(){ currentUser.favoriteStalls = currentUser.favoriteStalls || []; return currentUser.favoriteStalls; }
function isFav(stall){ return favs().includes(stall); }
function toggleFav(stall){ currentUser.favoriteStalls = isFav(stall) ? favs().filter(x=>x!==stall) : [...favs(), stall]; save(); renderListings(); toast(isFav(stall) ? t('addedFav') : t('removedFav')); }

function go(id){
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  applyLanguage();
  if(!currentUser){ $('bottomNav').innerHTML=''; window.scrollTo(0,0); return; }
  renderNav(id);
  if(id==='homeScreen') renderHome();
  if(id==='listingsScreen') renderListings();
  if(id==='addListingScreen') renderSlots();
  if(id==='ordersScreen') renderOrders();
  if(id==='feedbackScreen') renderFeedback();
  if(id==='profileScreen') renderProfile();
  if(id==='mapScreen') { renderNearbyList(); setTimeout(initMap, 80); }
  window.scrollTo({top:0, behavior:'smooth'});
}

$('showLogin').onclick = () => { $('showLogin').classList.add('active'); $('showSignup').classList.remove('active'); $('loginForm').classList.remove('hidden'); $('signupForm').classList.add('hidden'); };
$('showSignup').onclick = () => { $('showSignup').classList.add('active'); $('showLogin').classList.remove('active'); $('signupForm').classList.remove('hidden'); $('loginForm').classList.add('hidden'); };
$('signupRole').onchange = () => $('hawkerSignupFields').classList.toggle('hidden', $('signupRole').value !== 'hawker');
if($('sendCodeBtn')) $('sendCodeBtn').onclick = () => toast('No code is needed. Click Create account and check your email for a verification link.');
document.querySelectorAll('[data-go]').forEach(btn => btn.onclick = () => go(btn.dataset.go));
$('forgotPasswordBtn').onclick = async () => {
  const email = $('loginUsername').value.trim().toLowerCase();
  if(!email || !email.includes('@')) return toast('Enter your email address first, then tap Forgot password.');
  try {
    await sendPasswordResetEmail(auth, email);
    toast('Password reset email sent. Check your Inbox first, then Spam/Junk.');
  } catch(error){
    toast('Password reset failed: ' + error.message);
  }
};

$('loginForm').onsubmit = async e => {
  e.preventDefault();
  const loginId = $('loginUsername').value.trim();
  const password = $('loginPassword').value;

  if(!loginId.includes('@')){
    return toast('Please enter your verified email address, not a username.');
  }

  // Firebase login uses verified email + password.
  try {
    const credential = await signInWithEmailAndPassword(auth, loginId, password);
    if(!credential.user.emailVerified){
      await signOut(auth);
      return toast('Please verify your email first. Open the verification link sent by Firebase. Check Inbox, then Spam/Junk.');
    }

    const email = credential.user.email.toLowerCase();
    let user = users.find(u => (u.contact || '').toLowerCase() === email);

    // If the Firebase user exists but no local profile exists, create a basic resident profile.
    // Use Firebase displayName when available, never the full email as the display name.
    if(!user){
      const username = email.split('@')[0].replace(/[^a-z0-9]/g,'').slice(0,18) || 'resident';
      user = {
        username,
        password:'firebase-auth',
        contact:email,
        role:'resident',
        name:credential.user.displayName || username,
        verified:true,
        language:'en',
        favoriteStalls:[]
      };
      users.push(user);
    }

    // Fix older saved profiles where the name accidentally became the email.
    if(!user.name || user.name.toLowerCase() === email || user.name.includes('@')){
      user.name = credential.user.displayName || user.username || email.split('@')[0];
    }

    if(isSuspended(user.username)) return toast('Account temporarily suspended due to repeated reports');
    currentUser = {...user, verified:true, language:user.language || 'en', favoriteStalls:user.favoriteStalls || []};
    save();
    go('homeScreen');
  } catch(error){
    toast('Firebase login failed: ' + error.message);
  }
};
$('signupForm').onsubmit = async e => {
  e.preventDefault();
  const contact = $('signupContact').value.trim().toLowerCase();
  const password = $('signupPassword').value;
  const displayName = $('signupName').value.trim();
  const username = makeUsernameFromEmail(contact);

  if(!displayName) return toast('Please enter the name you want shown in the app.');
  if(users.some(u => (u.contact || '').toLowerCase() === contact)) return toast(t('duplicateContact'));
  if(!contact.includes('@')) return toast('Please use an email address for Firebase verification.');
  if(!validPassword(password)) return toast(t('passwordMin'));

  const role = $('signupRole').value;
  const newUser = {
    username,
    password:'firebase-auth',
    contact,
    role,
    name:displayName,
    verified:role === 'resident',
    language:'en',
    favoriteStalls:[],
    stallName:$('stallName').value.trim() || 'New Hawker Stall',
    centre:$('stallCentre').value.trim() || PASIR_RIS.name,
    certNo:$('certNo').value.trim()
  };

  try {
    const credential = await createUserWithEmailAndPassword(auth, contact, password);
    await updateProfile(credential.user, { displayName: displayName });
    await sendEmailVerification(credential.user, {
      url: window.location.origin + window.location.pathname,
      handleCodeInApp: false
    });

    users.push(newUser);
    save();
    await signOut(auth);

    toast('Account created. Firebase sent a verification link to your email. Check Inbox first, then Spam/Junk.');
    $('showLogin').click();
    $('loginUsername').value = '';
    $('loginPassword').value = '';
  } catch(error){
    toast('Firebase sign up failed: ' + error.message);
  }
};
function clearSessionOnly(){
  currentUser = null;
  localStorage.removeItem(KEY + 'currentUser');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('loggedInUser');
  sessionStorage.clear();
}

function clearFullAppStorage(){
  // Clear every HawkerLink saved item, including old accounts/listings saved on this browser.
  Object.keys(localStorage).forEach(key => {
    if(key.startsWith(KEY) || key.toLowerCase().includes('hawkerlink') || key === 'currentUser' || key === 'loggedInUser'){
      localStorage.removeItem(key);
    }
  });
  sessionStorage.clear();
  users = [];
  currentUser = null;
  orders = [];
  feedback = [];
  suspensions = {};
  stallReports = [];
}

async function logoutUser(){
  try { await signOut(auth); } catch(error) { console.warn('Firebase logout failed:', error); }
  clearSessionOnly();
  go('authScreen');
  toast('Logged out. Please log in again.');
}

async function resetAppCompletely(){
  const ok = confirm('Reset HawkerLink on this browser? This clears saved login data and restarts the app.');
  if(!ok) return;
  try { await signOut(auth); } catch(error) { console.warn('Firebase sign out during reset failed:', error); }
  clearFullAppStorage();
  window.location.href = window.location.pathname;
}

$('logoutBtn').onclick = logoutUser;
if($('resetAppBtn')) $('resetAppBtn').onclick = resetAppCompletely;

function navItem(target, icon, label, active){ return `<button class="nav-btn ${active===target?'active':''}" data-target="${target}" type="button"><span>${icons[icon]}</span><span class="nav-label">${label}</span></button>`; }
function renderNav(active){
  const resident = [['homeScreen','home',t('home')],['mapScreen','map',t('map')],['ordersScreen','collect',t('collect')],['feedbackScreen','feedback',t('feedback')],['profileScreen','profile',t('profile')]];
  const hawker = [['homeScreen','home',t('home')],['addListingScreen','list',t('list')],['ordersScreen','collect',t('collect')],['mapScreen','map',t('map')],['profileScreen','profile',t('profile')]];
  const arr = currentUser.role === 'hawker' ? hawker : resident;
  $('bottomNav').innerHTML = arr.map(x => navItem(x[0],x[1],x[2],active)).join('');
  document.querySelectorAll('.nav-btn').forEach(btn => btn.onclick = () => go(btn.dataset.target));
}
function quickCard(icon,title,desc,target){ return `<button class="quick-card" data-card="${target}" type="button"><div class="quick-top"><span>${icons[icon]}</span><span class="arrow">→</span></div><h3>${esc(title)}</h3><p>${esc(desc)}</p></button>`; }
function renderHome(){
  $('accountLabel').textContent = currentUser.role === 'hawker' ? t('hawkerAccount') : t('residentAccount');
  $('userName').textContent = currentUser.name || currentUser.username;
  const msg = currentUser.role === 'hawker' && !currentUser.verified ? 'Verification pending. Upload your food hygiene certificate before publishing public listings.' : '';
  $('roleAlert').textContent = msg; $('roleAlert').classList.toggle('hidden', !msg);
  const html = currentUser.role === 'hawker'
    ? quickCard('verify',t('verifyStall'),t('verifyStallDesc'),'verifyScreen') + quickCard('list',t('addListing'),t('addListingDesc'),'addListingScreen') + quickCard('collect',t('collectionQueue'),t('collectionQueueDesc'),'ordersScreen') + quickCard('map',t('nearbyMap'),t('nearbyMapDesc'),'mapScreen') + quickCard('profile',t('profile'),t('profileDesc'),'profileScreen')
    : quickCard('basket',t('freshListings'),t('freshListingsDesc'),'listingsScreen') + quickCard('map',t('map'),t('mapDesc'),'mapScreen') + quickCard('collect',t('myCollections'),t('myCollectionsDesc'),'ordersScreen') + quickCard('feedback',t('feedback'),t('feedbackDesc'),'feedbackScreen');
  $('quickGrid').innerHTML = html;
  document.querySelectorAll('[data-card]').forEach(btn => btn.onclick = () => go(btn.dataset.card));
}
function renderListings(){
  const filter = document.querySelector('.chip.active')?.dataset.filter || 'all';
  const query = ($('searchInput').value || '').toLowerCase().trim();
  const claimedIds = new Set(orders.filter(o => o.username === currentUser.username).map(o => o.listingId));
  const favSet = new Set(favs());
  const data = listings.filter(x => x.qtyLeft > 0 && !claimedIds.has(x.id)).filter(x => filter==='all' || x.category===filter).filter(x => [x.item,x.stall,x.centre,x.price,x.location,x.category].join(' ').toLowerCase().includes(query)).sort((a,b)=>(favSet.has(b.stall)-favSet.has(a.stall)) || a.stall.localeCompare(b.stall));
  $('favouritesBanner').classList.toggle('hidden', favs().length===0);
  $('favouritesBanner').innerHTML = favs().length ? `<strong>${t('favourites')}:</strong> ${favs().map(esc).join(', ')}` : '';
  $('listingContainer').innerHTML = data.length ? data.map(item => {
    const rating = avgRating(item.stall);
    const fb = stallFeedback(item.stall);
    return `<article class="listing-card"><div class="listing-head"><div><h3>${esc(item.item)}</h3><p class="helper">${esc(item.stall)} · ${esc(item.centre)}</p></div><button class="fav-btn ${isFav(item.stall)?'saved':''}" data-fav="${esc(item.stall)}" type="button">${isFav(item.stall)?t('removeFav'):t('addFav')}</button></div><div class="meta-row"><span class="pill">${rating ? rating+' ★' : t('newRating')}</span><span class="pill">${item.qtyLeft} ${t('qtyLeft')}</span><span class="pill">${esc(item.price)}</span><span class="pill">${esc(item.location)}</span></div><p class="helper"><strong>${t('collectionSlots')}:</strong> ${item.slots.map(esc).join(', ')}</p><div class="feedback-box"><div class="feedback-title">${t('seeFeedback')} · ${fb.length} ${fb.length===1?t('review'):t('reviews')}</div>${fb.length ? fb.map(f=>`<div class="review"><strong>${'★'.repeat(Number(f.stars))}</strong> ${esc(f.text)}${f.photo?`<br><strong>Photo proof:</strong> ${esc(f.photo)}`:''}</div>`).join('') : `<div class="review">${t('noFeedback')}</div>`}</div><div class="listing-actions"><button class="primary-btn" data-claim="${item.id}" type="button">${t('claimListing')}</button></div></article>`;
  }).join('') : `<div class="notice-card">${t('noListings')}</div>`;
  document.querySelectorAll('[data-claim]').forEach(btn => btn.onclick = () => openClaim(btn.dataset.claim));
  document.querySelectorAll('[data-fav]').forEach(btn => btn.onclick = () => toggleFav(btn.dataset.fav));
}
function renderSlots(){ $('itemSlots').innerHTML = SLOT_OPTIONS.map((slot,i)=>`<label><input type="checkbox" value="${esc(slot)}" ${i===4?'checked':''}/> ${esc(slot)}</label>`).join(''); }
$('addListingForm').onsubmit = e => {
  e.preventDefault();
  const selectedSlots = [...document.querySelectorAll('#itemSlots input:checked')].map(x=>x.value);
  if(!selectedSlots.length) return toast('Choose at least one collection slot');
  const item = { id:'L'+Date.now(), item:$('itemName').value.trim(), category:$('itemCategory').value, stall:currentUser.stallName || currentUser.name || 'Hawker Stall', centre:currentUser.centre || PASIR_RIS.name, qtyLeft:Number($('itemQty').value), maxPerUser:Number($('itemLimit').value), price:$('itemPrice').value.trim(), location:$('itemLocation').value.trim(), slots:selectedSlots, createdBy:currentUser.username };
  listings.unshift(item); save(); $('addListingForm').reset(); renderSlots(); toast(t('published')); go('homeScreen');
};
function openClaim(id){
  const item = listings.find(x=>x.id===id); if(!item) return;
  pendingClaimId = id; $('claimQty').max = item.maxPerUser; $('claimQty').value = 1;
  $('claimSlot').innerHTML = item.slots.map(s=>`<option>${esc(s)}</option>`).join('');
  selectedPayment = item.price.toLowerCase()==='free' ? 'Free' : 'PayNow';
  document.querySelectorAll('[data-pay]').forEach(b=>b.classList.toggle('active', b.dataset.pay===selectedPayment));
  $('claimModal').classList.remove('hidden'); applyLanguage();
}
$('closeModal').onclick = () => $('claimModal').classList.add('hidden');
document.querySelectorAll('[data-pay]').forEach(btn => btn.onclick = () => { selectedPayment = btn.dataset.pay; document.querySelectorAll('[data-pay]').forEach(b=>b.classList.toggle('active', b===btn)); });
$('confirmClaim').onclick = () => {
  const item = listings.find(x=>x.id===pendingClaimId); if(!item) return;
  const qty = Math.min(Number($('claimQty').value), item.maxPerUser, item.qtyLeft);
  item.qtyLeft -= qty;
  orders.unshift({id:'O'+Date.now(), listingId:item.id, username:currentUser.username, item:item.item, stall:item.stall, qty, slot:$('claimSlot').value, payment:selectedPayment, code:Math.random().toString(36).slice(2,8).toUpperCase(), date:'Today'});
  save(); $('claimModal').classList.add('hidden'); toast(t('claimSuccess')); go('ordersScreen');
};
function renderOrders(){
  if(currentUser.role === 'hawker'){
    const myListings = new Set(listings.filter(l => l.createdBy === currentUser.username || l.stall === currentUser.stallName).map(l => l.id));
    const incoming = orders.filter(o => myListings.has(o.listingId) || o.stall === currentUser.stallName);
    $('ordersContainer').innerHTML = incoming.length ? `<div class="notice-card"><strong>${t('incomingClaims')}</strong><br>${t('collectionQueueDesc')}</div>` + incoming.map(o=>`<article class="order-card"><h3>${esc(o.item)}</h3><p class="helper">${t('residentName')}: ${esc(o.username)} · ${esc(o.slot)}</p><div class="meta-row"><span class="pill">${t('qty')}: ${o.qty}</span><span class="pill">${t('payment')}: ${esc(o.payment)}</span><span class="pill">${t('claimCode')}: ${esc(o.code)}</span><span class="pill">${t('status')}: ${esc(o.status || t('active'))}</span></div>${o.status ? '' : `<button class="secondary-btn danger-btn" data-noshow="${o.id}" type="button">${t('hawkerNoShow')}</button>`}</article>`).join('') : `<div class="notice-card">${t('noIncomingClaims')}</div>`;
    document.querySelectorAll('[data-noshow]').forEach(btn => btn.onclick = () => markResidentNoShow(btn.dataset.noshow));
    return;
  }
  const mine = orders.filter(o=>o.username===currentUser.username);
  $('ordersContainer').innerHTML = mine.length ? mine.map(o=>`<article class="order-card"><h3>${esc(o.item)}</h3><p class="helper">${esc(o.stall)} · ${esc(o.slot)}</p><div class="meta-row"><span class="pill">${t('qty')}: ${o.qty}</span><span class="pill">${t('payment')}: ${esc(o.payment)}</span><span class="pill">${t('claimCode')}: ${esc(o.code)}</span><span class="pill">${t('status')}: ${esc(o.status || t('active'))}</span></div>${o.status ? '' : `<div class="order-actions"><button class="secondary-btn" data-cancel="${o.id}" type="button">${t('cancelClaim')}</button><button class="secondary-btn danger-btn" data-noveg="${o.id}" type="button">${t('noVegReport')}</button></div>`}</article>`).join('') : `<div class="notice-card">${t('noCollections')}</div>`;
  document.querySelectorAll('[data-cancel]').forEach(btn => btn.onclick = () => cancelClaim(btn.dataset.cancel));
  document.querySelectorAll('[data-noveg]').forEach(btn => btn.onclick = () => reportNoVegetables(btn.dataset.noveg));
}
function cancelClaim(id){
  const order = orders.find(o=>o.id===id && o.username===currentUser.username);
  if(!order || order.status) return;
  order.status = t('cancelled');
  const item = listings.find(l=>l.id===order.listingId);
  if(item) item.qtyLeft += Number(order.qty || 0);
  save(); toast(t('claimCancelled')); renderOrders();
}
function reportNoVegetables(id){
  const order = orders.find(o=>o.id===id && o.username===currentUser.username);
  if(!order) return;
  stallReports.push({id:'R'+Date.now(), type:'no_vegetables_available', stall:order.stall, listingId:order.listingId, item:order.item, username:currentUser.username, date:'Today'});
  order.reportedNoVegetables = true;
  save(); toast(t('noVegReported')); renderOrders();
}
function markResidentNoShow(id){
  const order = orders.find(o=>o.id===id);
  if(!order || order.status) return;
  order.status = 'Resident no-show';
  suspensions[order.username] = suspensions[order.username] || {count:0};
  suspensions[order.username].count += 1;
  if(suspensions[order.username].count >= 3){ suspensions[order.username].until = Date.now() + 7*24*60*60*1000; }
  save(); toast(t('noShowMarked')); renderOrders();
}
function renderFeedback(){
  const mine = orders.filter(o=>o.username===currentUser.username && !o.status);
  $('feedbackOrder').innerHTML = mine.length ? mine.map(o=>`<option value="${o.id}">${esc(o.item)} · ${esc(o.stall)}</option>`).join('') : `<option value="">${t('noClaimed')}</option>`;
}
$('feedbackForm').onsubmit = e => {
  e.preventDefault();
  const order = orders.find(o=>o.id===$('feedbackOrder').value); if(!order) return toast(t('claimBeforeFeedback'));
  const file = $('feedbackPhoto').files[0];
  feedback.push({ id:'F'+Date.now(), stall:order.stall, item:order.item, stars:Number($('feedbackStars').value), text:$('feedbackText').value.trim(), username:currentUser.username, date:'Today', photo:file ? file.name : '' });
  if($('reportIssue').checked){ stallReports.push({id:'R'+Date.now(), type:'feedback_issue_or_no_vegetables', stall:order.stall, listingId:order.listingId, item:order.item, username:currentUser.username, date:'Today', photo:file ? file.name : ''}); }
  save(); $('feedbackForm').reset(); toast(t('feedbackSubmitted')); renderFeedback();
};
$('verifyForm').onsubmit = e => {
  e.preventDefault(); currentUser.stallName = $('verifyStall').value.trim(); currentUser.certNo = $('verifyCert').value.trim(); currentUser.verified = true; save(); toast(t('verificationSaved')); go('profileScreen');
};
function renderProfile(){
  $('languageSelect').value = lang();
  const rows = [[t('name'), currentUser.name || currentUser.username],[t('account'), currentUser.role === 'hawker' ? t('hawker') : t('resident')],[t('contact'), currentUser.contact],[t('contactVerified'), t('yes')],[t('favourites'), favs().length ? favs().join(', ') : t('noFav')]];
  if(currentUser.role==='hawker'){ rows.push([t('stall'), currentUser.stallName || '-']); rows.push([t('hygieneCert'), currentUser.certNo || '-']); rows.push([t('verified'), currentUser.verified ? t('yes') : t('pending')]); }
  $('profileCard').innerHTML = rows.map(r=>`<div class="profile-row"><span>${esc(r[0])}</span><strong>${esc(r[1])}</strong></div>`).join('');
}
$('languageSelect').onchange = () => { currentUser.language = $('languageSelect').value; save(); const active = document.querySelector('.screen.active')?.id || 'homeScreen'; applyLanguage(); renderNav(active); if(active==='homeScreen') renderHome(); if(active==='listingsScreen') renderListings(); if(active==='ordersScreen') renderOrders(); if(active==='feedbackScreen') renderFeedback(); if(active==='profileScreen') renderProfile(); if(active==='mapScreen') renderNearbyList(); toast(t('saved')); };
function renderNearbyList(){
  $('nearbyHawkerList').innerHTML = `<h3>${t('nearbyCentres')}</h3>` + NEARBY_HAWKERS.map(h=>`<div class="nearby-card"><div><h4>${esc(h.name)}</h4><p>${esc(h.address)}</p></div><button class="secondary-btn" data-centre="${esc(h.name)}" type="button">${t('map')}</button></div>`).join('');
  document.querySelectorAll('[data-centre]').forEach(btn => btn.onclick = () => { const h = NEARBY_HAWKERS.find(x=>x.name===btn.dataset.centre); focusCentre(h); });
}
function initMap(){
  if(!window.L) return;
  if(!map){
    map = L.map('leafletMap', {zoomControl:false}).setView([PASIR_RIS.lat,PASIR_RIS.lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19, attribution:'' }).addTo(map);
  }
  map.setView([PASIR_RIS.lat,PASIR_RIS.lng], 13);
  mapMarkers.forEach(m=>map.removeLayer(m)); mapMarkers = [];
  NEARBY_HAWKERS.forEach(h => { const marker = L.marker([h.lat,h.lng]).addTo(map).bindPopup(`<strong>${esc(h.name)}</strong><br>${esc(h.address)}`); mapMarkers.push(marker); });
  setTimeout(()=>map.invalidateSize(),100);
}
function focusCentre(h){ if(!h || !map) return; map.setView([h.lat,h.lng], 16); const marker = mapMarkers.find(m => Math.abs(m.getLatLng().lat-h.lat)<.0001); if(marker) marker.openPopup(); $('locationText').textContent = `${t('selectedLocation')}: ${h.name}`; }
$('resetPasirRisBtn').onclick = () => { if(map) map.setView([PASIR_RIS.lat,PASIR_RIS.lng],15); $('locationText').textContent = t('currentPasirRis'); $('gpsStatus').textContent = t('mapNote'); };
$('gpsBtn').onclick = () => {
  if(!navigator.geolocation) return toast(t('gpsUnsupported'));
  $('gpsStatus').textContent = t('gpsLoading');
  navigator.geolocation.getCurrentPosition(pos=>{
    const {latitude, longitude} = pos.coords;
    if(map){ if(userMarker) map.removeLayer(userMarker); userMarker = L.circleMarker([latitude, longitude], {radius:10}).addTo(map).bindPopup('You are here'); map.setView([latitude, longitude], 14); }
    const far = Math.abs(latitude-PASIR_RIS.lat) > 0.08 || Math.abs(longitude-PASIR_RIS.lng) > 0.08;
    $('locationText').textContent = far ? t('currentPasirRis') : `${t('selectedLocation')}: GPS`;
    $('gpsStatus').textContent = far ? t('gpsFar') : t('gpsUpdated');
    if(far && map) map.setView([PASIR_RIS.lat,PASIR_RIS.lng],14);
  },()=>{ $('gpsStatus').textContent = t('gpsFail'); if(map) map.setView([PASIR_RIS.lat,PASIR_RIS.lng],14); },{enableHighAccuracy:true,timeout:6000,maximumAge:0});
};
$('openMapBtn').onclick = () => window.open(`https://www.google.com/maps/search/?api=1&query=${PASIR_RIS.lat},${PASIR_RIS.lng}`,'_blank');
$('searchInput').oninput = renderListings; $('clearSearch').onclick = () => { $('searchInput').value=''; renderListings(); };
document.querySelectorAll('.chip').forEach(btn => btn.onclick = () => { document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active')); btn.classList.add('active'); renderListings(); });
$('mapSearch').oninput = () => { const q = $('mapSearch').value.toLowerCase(); const h = NEARBY_HAWKERS.find(x => x.name.toLowerCase().includes(q) || x.address.toLowerCase().includes(q)); if(h) focusCentre(h); };

renderSlots(); drawIcons(); applyLanguage();

// Keep Firebase Authentication and the app's saved browser session in sync.
// This prevents deleted Firebase users from staying logged in through old localStorage data.
onAuthStateChanged(auth, async firebaseUser => {
  if(!firebaseUser){
    if(currentUser){
      clearSessionOnly();
      toast('Session ended. Please log in again.');
    }
    go('authScreen');
    return;
  }

  // If email is not verified, do not allow the app to stay logged in.
  if(!firebaseUser.emailVerified){
    await signOut(auth);
    clearSessionOnly();
    go('authScreen');
    toast('Please verify your email first. Check Inbox, then Spam/Junk.');
    return;
  }

  const email = (firebaseUser.email || '').toLowerCase();
  let user = users.find(u => (u.contact || '').toLowerCase() === email);

  if(!user){
    const username = makeUsernameFromEmail(email);
    user = {
      username,
      password:'firebase-auth',
      contact:email,
      role:'resident',
      name:firebaseUser.displayName || username,
      verified:true,
      language:'en',
      favoriteStalls:[]
    };
    users.push(user);
  }

  if(!user.name || user.name.toLowerCase() === email || user.name.includes('@')){
    user.name = firebaseUser.displayName || user.username || email.split('@')[0];
  }

  if(isSuspended(user.username)){
    await signOut(auth);
    clearSessionOnly();
    go('authScreen');
    toast('Account temporarily suspended due to repeated reports');
    return;
  }

  currentUser = {...user, verified:true, language:user.language || 'en', favoriteStalls:user.favoriteStalls || []};
  save();
  go('homeScreen');
});
