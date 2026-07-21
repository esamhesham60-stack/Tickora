// TICKORA - EN/AR language toggle. Applies to pages with data-i18n-page on <html>.
// Does not mirror the layout to RTL - only translates text and right-aligns Arabic prose,
// keeping the (Latin-branded) structural layout the same in both languages.

const UI_TEXT = {
  en: {
    navShop: 'Shop', navReviews: 'Reviews', navStory: 'Story', navLeadership: 'Leadership',
    navDetails: 'Details', navContact: 'Contact', navShopNow: 'Shop Now',
    navLogin: 'Login', navLogout: 'Logout', navAdmin: 'Admin Dashboard',

    heroEyebrow: 'TICKORA — Everyday Watches',
    heroTitle: 'Time, worn <span class="accent">well.</span>',
    heroBody: "No case full of complications you'll never use. Just a well-built watch for the version of your day that actually happens — meetings, gym, dinner, repeat.",
    heroCta1: 'Shop the collection', heroCta2: 'Our story',

    marquee: ['JAPANESE QUARTZ MOVEMENT', '5ATM WATER RESISTANT', 'SAPPHIRE-COATED CRYSTAL', '24-MONTH WARRANTY', 'FREE UAE SHIPPING'],

    trustWarranty: 'Warranty', trustWaterResist: 'Water Resist.', trustShipping: 'UAE Shipping',

    shopEyebrow: 'The Collection', shopTitle: 'Six watches. Zero clutter.',
    shopBody: 'Every model runs the same reliable core — sapphire-coated crystal, 5ATM water resistance, a movement that just works.',
    addToCart: 'Add to cart', addedToCart: 'Added ✓', getQuotation: 'Get a Quotation',

    reviewsEyebrow: 'Worn Daily', reviewsTitle: 'What people actually say.',
    review1: '"Wore it to the gym, a client meeting, and a wedding — same watch, zero issues. That\'s the whole pitch."',
    review1Name: '— K. Al Mansoori, Dubai',
    review2: '"Finally a watch brand that doesn\'t try to sell me a hobby. Just a good daily watch at a fair price."',
    review2Name: '— R. Hamdan, Abu Dhabi',

    storyEyebrow: 'Why We Started', storyTitle: 'We got tired of the collector talk.',
    storyP1: "Most watch brands sell you a hobby — limited drops, complications you'll never touch, a case full of pieces you rotate through for no reason but the algorithm. That's not what most people actually want from a watch.",
    storyP2: "TICKORA sells one reliable watch for the day you actually have: the commute, the gym, dinner after. Built on dependable movements, honest materials, and fair pricing — no hype drops, no waitlists, just a good watch you can put on and forget about.",

    leadershipCaption: 'FOUNDER & CEO — Eng. Esam Hesham',
    leadershipEyebrow: 'The Engineer Behind The Brand',
    leadershipTitle: 'Built by someone who reads spec sheets for fun.',
    cred1: 'Mechatronics Engineering', cred2: 'Ex-Electrical Engineer, UAE', cred3: 'Founder & CEO, TICKORA',
    leadershipP1: "Before TICKORA, Esam Hesham spent his early career as an electrical engineer, moving between companies across the UAE and working on systems where a half-millimeter tolerance is the difference between something that works and something that fails. He studied mechatronics — the discipline that sits at the intersection of mechanical, electrical, and software engineering — and it shaped how he sees almost everything, watches included.",
    leadershipP2: "He noticed the watch market mostly offered two options: unaffordable luxury, or fast-fashion pieces that don't survive a year. Nobody was building for the person who just wants one well-made watch that holds up to a real week — gym, meetings, dinner, repeat. So he started sourcing movements, testing water-resistance ratings himself, and comparing case tolerances the way he used to compare component specs on the job. TICKORA came out of that research, not a mood board.",
    leadershipP3: "That's still how the company runs today. Esam stays personally involved in every model TICKORA ships — vetting movement suppliers, pressure-testing water resistance claims, and rejecting cases that don't meet the tolerances he'd expect from any piece of precision equipment. The brand's promise — reliable movements, honest materials, fair pricing — isn't marketing copy. It's just how he was trained to build things.",
    leadershipQuote: '"I didn\'t set out to build another watch brand. I set out to build one that was engineered right."',
    leadershipQuoteCite: '— Esam Hesham, Founder & CEO',

    whyEyebrow: "What's Actually Inside", whyTitle: 'The spec sheet, not the sales pitch.',
    spec1Num: '01 — CASE', spec1H: '40mm Stainless Steel', spec1Headline: 'Slim by design',
    spec1P: "Thin enough to slide under a shirt cuff, solid enough that you forget it's an accessory.",
    spec2Num: '02 — MOVEMENT', spec2H: 'Japanese Quartz', spec2Headline: 'Accurate, no fuss',
    spec2P: "No winding, no charging, no app. It keeps time so you don't have to think about it.",
    spec3Num: '03 — WARRANTY', spec3H: '24 Months', spec3Headline: 'Buy once',
    spec3P: "Full replacement movement warranty, backed locally across the UAE.",

    newsletterTitle: 'Get 10% off your first watch',
    newsletterBody: 'One email when we launch something new. No spam, unsubscribe anytime.',
    newsletterMsgDefault: "You're in — check your inbox for the code.",
    newsletterBtn: 'Notify me',

    footerBrandBlurb: 'Everyday watches, engineered right. Reliable movements, honest materials, fair pricing — one good watch instead of a case full of them.',
    footerShopH: 'Shop', footerShop1: 'All watches', footerShop2: 'Best sellers', footerShop3: 'New arrivals',
    footerSupportH: 'Support', footerSupport1: 'Warranty', footerSupport2: 'Contact us', footerSupport3: 'Shipping & returns',
    footerCompanyH: 'Company', footerCompany1: 'Our story', footerCompany2: 'Leadership', footerCompany3: 'Careers',
    footerCopyright: '© 2026 TICKORA. All rights reserved.',
    footerPrivacy: 'Privacy Policy', footerTerms: 'Terms of Service',

    pdBack: '← Back to the collection',
    pdCase: 'Case', pdMovement: 'Movement', pdWaterResistance: 'Water Resistance', pdWarranty: 'Warranty',
    pdAddToCart: 'Add to Cart', pdAdded: 'Added ✓', pdQuoteWa: 'Get a Quotation on WhatsApp',
    pdMore: 'More from the collection',
    pdDescSuffix: ' Built on the same reliable core as every TICKORA watch — sapphire-coated crystal, 5ATM water resistance, and a movement that just works.',

    tabLogin: 'Login', tabSignup: 'Sign Up',
    loginTitle: 'Welcome back', loginSub: 'Log in to track your quotations and orders.',
    fieldEmail: 'Email', fieldPassword: 'Password', btnLogin: 'Log In',
    signupTitle: 'Create your account', signupSub: 'Get 10% off your first watch and faster quotations.',
    fieldFullName: 'Full Name', btnSignup: 'Sign Up',
    msgLoggedIn: 'Logged in — redirecting...',
    msgAccountCreated: 'Account created — redirecting...',
    msgCheckEmail: 'Account created. Check your email to confirm, then log in.',

    cartTitle: 'Your Cart', cartEmpty: 'Your cart is empty.', cartRemove: 'Remove', cartTotal: 'Total',
    cartQuoteWa: 'Get a Quotation on WhatsApp',
  },
  ar: {
    navShop: 'المتجر', navReviews: 'التقييمات', navStory: 'قصتنا', navLeadership: 'القيادة',
    navDetails: 'التفاصيل', navContact: 'تواصل', navShopNow: 'تسوق الآن',
    navLogin: 'تسجيل الدخول', navLogout: 'تسجيل الخروج', navAdmin: 'لوحة التحكم',

    heroEyebrow: 'TICKORA — ساعات لكل يوم',
    heroTitle: 'الوقت، <span class="accent">بأناقة.</span>',
    heroBody: 'لا صندوق مليء بمزايا معقدة لن تستخدمها أبدًا. فقط ساعة مصنوعة بإتقان لتناسب يومك كما هو فعلًا — اجتماعات، صالة رياضية، عشاء، وتتكرر.',
    heroCta1: 'تسوّق المجموعة', heroCta2: 'قصتنا',

    marquee: ['حركة كوارتز يابانية', 'مقاومة للماء 5ATM', 'بلورة مطلية بالياقوت', 'ضمان 24 شهرًا', 'شحن مجاني داخل الإمارات'],

    trustWarranty: 'الضمان', trustWaterResist: 'مقاومة الماء', trustShipping: 'الشحن للإمارات',

    shopEyebrow: 'المجموعة', shopTitle: 'ست ساعات. بلا تعقيد.',
    shopBody: 'يعتمد كل طراز على نفس الأساس الموثوق — بلورة مطلية بالياقوت، مقاومة للماء حتى 5ATM، وحركة تعمل بثبات دائمًا.',
    addToCart: 'أضف إلى السلة', addedToCart: 'أُضيف ✓', getQuotation: 'اطلب عرض سعر',

    reviewsEyebrow: 'تُلبَس يوميًا', reviewsTitle: 'ماذا يقول عملاؤنا فعلًا.',
    review1: '"ارتديتها في الجيم، واجتماع عمل، وحفل زفاف — نفس الساعة، بلا أي مشكلة. هذا هو جوهر الفكرة."',
    review1Name: '— ك. المنصوري، دبي',
    review2: '"أخيرًا علامة ساعات لا تحاول بيعي هواية. مجرد ساعة يومية جيدة بسعر عادل."',
    review2Name: '— ر. حمدان، أبوظبي',

    storyEyebrow: 'لماذا بدأنا', storyTitle: 'سئمنا من حديث هواة الجمع.',
    storyP1: 'معظم علامات الساعات تبيعك هواية — إصدارات محدودة، تعقيدات لن تلمسها أبدًا، ومجموعة قطع تتنقل بينها بلا سبب حقيقي سوى الخوارزميات. هذا ليس ما يريده معظم الناس فعلًا من ساعة.',
    storyP2: 'تيكورا تقدّم ساعة موثوقة واحدة ليومك الحقيقي: الطريق للعمل، الجيم، والعشاء بعدها. مبنية على حركات يُعتمد عليها، خامات صادقة، وأسعار عادلة — بلا إصدارات مبالغ فيها، بلا قوائم انتظار، فقط ساعة جيدة ترتديها وتنساها.',

    leadershipCaption: 'المؤسس والرئيس التنفيذي — م. عصام هشام',
    leadershipEyebrow: 'المهندس وراء العلامة',
    leadershipTitle: 'بناها شخص يقرأ جداول المواصفات للمتعة.',
    cred1: 'هندسة الميكاترونكس', cred2: 'مهندس كهرباء سابق، الإمارات', cred3: 'المؤسس والرئيس التنفيذي، تيكورا',
    leadershipP1: 'قبل تيكورا، قضى عصام هشام بداية مسيرته المهنية كمهندس كهرباء، متنقلًا بين شركات في الإمارات، وعمل على أنظمة يكون فيها فارق نصف مليمتر هو الحد الفاصل بين شيء يعمل وآخر يفشل. درس الميكاترونكس — التخصص الذي يجمع بين الهندسة الميكانيكية والكهربائية والبرمجيات — وهذا شكّل طريقة رؤيته لكل شيء تقريبًا، بما في ذلك الساعات.',
    leadershipP2: 'لاحظ أن سوق الساعات يقدّم في الغالب خيارين فقط: فخامة باهظة الثمن، أو قطع سريعة الاستهلاك لا تدوم عامًا. لم يكن أحد يصنع لمن يريد فقط ساعة واحدة مصنوعة جيدًا تتحمل أسبوعًا حقيقيًا — جيم، اجتماعات، عشاء، وتكرار. فبدأ بالبحث عن حركات الساعات بنفسه، واختبار درجات مقاومة الماء، ومقارنة تفاوتات الهيكل بنفس الطريقة التي كان يقارن بها مواصفات المكوّنات في عمله. تيكورا وُلدت من هذا البحث، لا من لوحة إلهام.',
    leadershipP3: 'وهكذا لا تزال الشركة تعمل حتى اليوم. يبقى عصام مشاركًا شخصيًا في كل موديل تطرحه تيكورا — من تدقيق موردي الحركات، واختبار مقاومة الماء تحت الضغط، ورفض أي هيكل لا يحقق التفاوتات التي يتوقعها من أي معدة دقيقة. وعد العلامة — حركات موثوقة، خامات صادقة، أسعار عادلة — ليس كلامًا تسويقيًا، بل هو ببساطة الطريقة التي تدرّب بها على صناعة الأشياء.',
    leadershipQuote: '"لم أخطط لبناء علامة ساعات أخرى. خططت لبناء واحدة مصممة بشكل صحيح هندسيًا."',
    leadershipQuoteCite: '— عصام هشام، المؤسس والرئيس التنفيذي',

    whyEyebrow: 'ما بداخلها فعلًا', whyTitle: 'جدول المواصفات، لا خطاب المبيعات.',
    spec1Num: '01 — الهيكل', spec1H: 'ستانلس ستيل 40 ملم', spec1Headline: 'نحيفة بالتصميم',
    spec1P: 'نحيفة بما يكفي لتنزلق تحت كم القميص، وصلبة بما يكفي لتنسى أنها إكسسوار.',
    spec2Num: '02 — الحركة', spec2H: 'كوارتز ياباني', spec2Headline: 'دقيقة، بلا تعقيد',
    spec2P: 'بلا لف، بلا شحن، بلا تطبيق. تحافظ على الوقت فلا داعي أن تفكر فيه.',
    spec3Num: '03 — الضمان', spec3H: '24 شهرًا', spec3Headline: 'اشترِ مرة واحدة',
    spec3P: 'ضمان استبدال كامل للحركة، مدعوم محليًا في جميع أنحاء الإمارات.',

    newsletterTitle: 'احصل على خصم 10% على أول ساعة',
    newsletterBody: 'إيميل واحد عند إطلاق شيء جديد. بلا إزعاج، ويمكنك إلغاء الاشتراك في أي وقت.',
    newsletterMsgDefault: 'تم التسجيل — تحقق من بريدك الإلكتروني للحصول على الكود.',
    newsletterBtn: 'أعلمني',

    footerBrandBlurb: 'ساعات لكل يوم، مصممة هندسيًا بإتقان. حركات موثوقة، خامات صادقة، أسعار عادلة — ساعة واحدة جيدة بدلًا من صندوق مليء بها.',
    footerShopH: 'المتجر', footerShop1: 'كل الساعات', footerShop2: 'الأكثر مبيعًا', footerShop3: 'وصل حديثًا',
    footerSupportH: 'الدعم', footerSupport1: 'الضمان', footerSupport2: 'تواصل معنا', footerSupport3: 'الشحن والإرجاع',
    footerCompanyH: 'الشركة', footerCompany1: 'قصتنا', footerCompany2: 'القيادة', footerCompany3: 'الوظائف',
    footerCopyright: '© 2026 تيكورا. جميع الحقوق محفوظة.',
    footerPrivacy: 'سياسة الخصوصية', footerTerms: 'شروط الخدمة',

    pdBack: '← العودة إلى المجموعة',
    pdCase: 'الهيكل', pdMovement: 'الحركة', pdWaterResistance: 'مقاومة الماء', pdWarranty: 'الضمان',
    pdAddToCart: 'أضف إلى السلة', pdAdded: 'أُضيف ✓', pdQuoteWa: 'اطلب عرض سعر عبر واتساب',
    pdMore: 'المزيد من المجموعة',
    pdDescSuffix: ' مبنية على نفس الأساس الموثوق لكل ساعة تيكورا — بلورة مطلية بالياقوت، مقاومة للماء 5ATM، وحركة تعمل بثبات دائمًا.',

    tabLogin: 'تسجيل الدخول', tabSignup: 'إنشاء حساب',
    loginTitle: 'مرحبًا بعودتك', loginSub: 'سجّل الدخول لمتابعة عروض الأسعار وطلباتك.',
    fieldEmail: 'البريد الإلكتروني', fieldPassword: 'كلمة المرور', btnLogin: 'تسجيل الدخول',
    signupTitle: 'أنشئ حسابك', signupSub: 'احصل على خصم 10% على أول ساعة وعروض أسعار أسرع.',
    fieldFullName: 'الاسم الكامل', btnSignup: 'إنشاء حساب',
    msgLoggedIn: 'تم تسجيل الدخول — جارٍ التحويل...',
    msgAccountCreated: 'تم إنشاء الحساب — جارٍ التحويل...',
    msgCheckEmail: 'تم إنشاء الحساب. تحقق من بريدك الإلكتروني للتأكيد، ثم سجّل الدخول.',

    cartTitle: 'سلتك', cartEmpty: 'سلتك فارغة.', cartRemove: 'إزالة', cartTotal: 'الإجمالي',
    cartQuoteWa: 'اطلب عرض سعر عبر واتساب',
  },
};

function getCurrentLang() {
  return document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'en';
}

function t(key) {
  const lang = getCurrentLang();
  const dict = UI_TEXT[lang] || UI_TEXT.en;
  return (key in dict) ? dict[key] : (UI_TEXT.en[key] || '');
}

// selector -> translation key. `html:true` entries may contain inline tags (e.g. the accent span).
const I18N_RULES = [
  ['#navLinks a[href*="#shop"]:not(.btn)', 'navShop'],
  ['#navLinks a[href*="#reviews"]', 'navReviews'],
  ['#navLinks a[href*="#story"]', 'navStory'],
  ['#navLinks a[href*="#leadership"]', 'navLeadership'],
  ['#navLinks a[href*="#why"]', 'navDetails'],
  ['#navLinks a[href*="#contact"]:not(.btn)', 'navContact'],
  ['#navLinks .btn.btn-primary', 'navShopNow'],

  ['#top .eyebrow', 'heroEyebrow'],
  ['#top h1', 'heroTitle', true],
  ['.hero p', 'heroBody'],
  ['.hero-ctas .btn-primary', 'heroCta1'],
  ['.hero-ctas .btn-ghost', 'heroCta2'],

  ['.trust-strip .trust-badge:nth-child(1) .label', 'trustWarranty'],
  ['.trust-strip .trust-badge:nth-child(2) .label', 'trustWaterResist'],
  ['.trust-strip .trust-badge:nth-child(3) .label', 'trustShipping'],

  ['#shop .eyebrow', 'shopEyebrow'],
  ['#shop h2', 'shopTitle'],
  ['#shop .section-head p', 'shopBody'],

  ['#reviews .eyebrow', 'reviewsEyebrow'],
  ['#reviews h2', 'reviewsTitle'],
  ['.review-card:nth-child(1) p', 'review1'],
  ['.review-card:nth-child(1) .review-name', 'review1Name'],
  ['.review-card:nth-child(2) p', 'review2'],
  ['.review-card:nth-child(2) .review-name', 'review2Name'],

  ['#story .eyebrow', 'storyEyebrow'],
  ['#story h2', 'storyTitle'],
  ['#story .split-text p:nth-of-type(1)', 'storyP1'],
  ['#story .split-text p:nth-of-type(2)', 'storyP2'],

  ['#leadership .frame-caption', 'leadershipCaption'],
  ['#leadership .eyebrow', 'leadershipEyebrow'],
  ['#leadership h2', 'leadershipTitle'],
  ['#leadership .cred-row span:nth-of-type(1)', 'cred1'],
  ['#leadership .cred-row span:nth-of-type(2)', 'cred2'],
  ['#leadership .cred-row span:nth-of-type(3)', 'cred3'],
  ['#leadership .split-text > p:nth-of-type(1)', 'leadershipP1'],
  ['#leadership .split-text > p:nth-of-type(2)', 'leadershipP2'],
  ['#leadership .split-text > p:nth-of-type(3)', 'leadershipP3'],
  ['#leadership .pull-quote', 'leadershipQuote'],
  ['#leadership .pull-quote cite', 'leadershipQuoteCite'],

  ['#why .eyebrow', 'whyEyebrow'],
  ['#why h2', 'whyTitle'],
  ['.spec-cell:nth-child(1) .num', 'spec1Num'],
  ['.spec-cell:nth-child(1) h3', 'spec1H'],
  ['.spec-cell:nth-child(1) .headline', 'spec1Headline'],
  ['.spec-cell:nth-child(1) p', 'spec1P'],
  ['.spec-cell:nth-child(2) .num', 'spec2Num'],
  ['.spec-cell:nth-child(2) h3', 'spec2H'],
  ['.spec-cell:nth-child(2) .headline', 'spec2Headline'],
  ['.spec-cell:nth-child(2) p', 'spec2P'],
  ['.spec-cell:nth-child(3) .num', 'spec3Num'],
  ['.spec-cell:nth-child(3) h3', 'spec3H'],
  ['.spec-cell:nth-child(3) .headline', 'spec3Headline'],
  ['.spec-cell:nth-child(3) p', 'spec3P'],

  ['.newsletter h3', 'newsletterTitle'],
  ['.newsletter > div > p:not(.newsletter-msg)', 'newsletterBody'],
  ['.newsletter-form button', 'newsletterBtn'],

  ['.footer-col:nth-child(1) p', 'footerBrandBlurb'],
  ['.footer-col:nth-child(2) h4', 'footerShopH'],
  ['.footer-col:nth-child(2) a:nth-of-type(1)', 'footerShop1'],
  ['.footer-col:nth-child(2) a:nth-of-type(2)', 'footerShop2'],
  ['.footer-col:nth-child(2) a:nth-of-type(3)', 'footerShop3'],
  ['.footer-col:nth-child(3) h4', 'footerSupportH'],
  ['.footer-col:nth-child(3) a:nth-of-type(1)', 'footerSupport1'],
  ['.footer-col:nth-child(3) a:nth-of-type(2)', 'footerSupport2'],
  ['.footer-col:nth-child(3) a:nth-of-type(3)', 'footerSupport3'],
  ['.footer-col:nth-child(4) h4', 'footerCompanyH'],
  ['.footer-col:nth-child(4) a:nth-of-type(1)', 'footerCompany1'],
  ['.footer-col:nth-child(4) a:nth-of-type(2)', 'footerCompany2'],
  ['.footer-col:nth-child(4) a:nth-of-type(3)', 'footerCompany3'],
  ['.legal-link[href="privacy.html"]', 'footerPrivacy'],
  ['.legal-link[href="terms.html"]', 'footerTerms'],

  // product.html
  ['.pd-back', 'pdBack'],
  ['.pd-spec-row:nth-child(1) span:first-child', 'pdCase'],
  ['.pd-spec-row:nth-child(2) span:first-child', 'pdMovement'],
  ['.pd-spec-row:nth-child(3) span:first-child', 'pdWaterResistance'],
  ['.pd-spec-row:nth-child(4) span:first-child', 'pdWarranty'],
  ['#pdMoreGrid + h3, .pd-more h3', 'pdMore'],

  // account.html
  ['#tabLogin', 'tabLogin'], ['#tabSignup', 'tabSignup'],
  ['#loginForm h2', 'loginTitle'], ['#loginForm .sub', 'loginSub'],
  ['#loginForm label[for="loginEmail"]', 'fieldEmail'],
  ['#loginForm label[for="loginPassword"]', 'fieldPassword'],
  ['#loginForm .auth-submit', 'btnLogin'],
  ['#signupForm h2', 'signupTitle'], ['#signupForm .sub', 'signupSub'],
  ['#signupForm label[for="signupName"]', 'fieldFullName'],
  ['#signupForm label[for="signupEmail"]', 'fieldEmail'],
  ['#signupForm label[for="signupPassword"]', 'fieldPassword'],
  ['#signupForm .auth-submit', 'btnSignup'],
];

function applyTranslations() {
  I18N_RULES.forEach(([selector, key, isHtml]) => {
    document.querySelectorAll(selector).forEach(el => {
      if (isHtml) el.innerHTML = t(key);
      else el.textContent = t(key);
    });
  });

  // marquee (JS-generated ticker)
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack && typeof buildMarqueeSet === 'function') {
    marqueeTrack.innerHTML = buildMarqueeSet() + buildMarqueeSet();
  }

  // newsletter placeholder + default message
  const newsletterEmail = document.getElementById('newsletterEmail');
  if (newsletterEmail) newsletterEmail.placeholder = 'you@email.com';
  const newsletterMsg = document.getElementById('newsletterMsg');
  if (newsletterMsg && !newsletterMsg.dataset.customMsg) newsletterMsg.textContent = t('newsletterMsgDefault');

  // footer copyright line - only replace the leading text node, since the rest of the
  // <p> holds the Privacy/Terms links (translated separately via I18N_RULES above)
  const footerP = document.querySelector('.footer-bottom p');
  if (footerP && footerP.firstChild && footerP.firstChild.nodeType === Node.TEXT_NODE) {
    footerP.firstChild.textContent = t('footerCopyright') + ' ';
  }

  document.dispatchEvent(new CustomEvent('tickora:langchange'));
}

function setLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  try { localStorage.setItem('tickora_lang', lang); } catch (e) {}
  applyTranslations();
}

function initLangToggle() {
  const btn = document.getElementById('langToggle');
  if (!btn) return;
  const sync = () => { btn.textContent = getCurrentLang() === 'ar' ? 'EN' : 'AR'; };
  sync();
  btn.addEventListener('click', () => {
    setLanguage(getCurrentLang() === 'ar' ? 'en' : 'ar');
    sync();
  });
  if (document.documentElement.hasAttribute('data-i18n-page')) applyTranslations();
}

document.addEventListener('DOMContentLoaded', initLangToggle);
