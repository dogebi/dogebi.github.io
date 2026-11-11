// 영상 화면 문구와 12개 자막 큐의 4개 언어 전환을 관리
(function () {
  'use strict';

  const copy = {
    ko: {
      htmlLang: 'ko', pageTitle: '1초는 누가 어떻게 정했을까?', switcher: '언어 선택',
      text: {
        introKicker: '시간의 기준', timeUnit: '시간의 단위', heroTitle: '1초는 누가<br>정했을까?', answer: '한 사람의 답이 아닙니다', observe: '관측', agree: '합의', standard: '표준',
        sunKicker: '태양을 따라 세던 시간', stoneCaption: '평균 태양일을 나눈 초', orbitYear: '1900 · 열대년',
        atomKicker: '하늘에서 원자로', highEnergy: '높은 에너지', lowEnergy: '낮은 에너지', standardsBody: '국제도량형총회', countCaption: '세슘 133 원자의 진동 횟수', yearStamp: '1967 · 국제도량형총회', refine: '2018 · 정의의 표현을 더 정밀하게',
        presentKicker: '오늘의 1초', oneSecond: '1초', presentCaption: '세슘 원자의 일정한 리듬을 기준으로', closing: '하늘을 보던 시간에서<br><em>원자의 리듬</em>을 세는 시간으로', closingFoot: '더 정확한 시간을 찾으려는 사람들의 합의',
      },
      captions: [
        '1초는 누가 정했을까요? 놀랍게도, 한 사람이 정한 건 아닙니다.',
        '오랜 시간에 걸쳐 사람들이 더 정확한 기준을 함께 정해 온 결과예요.',
        '처음에는 하루를 24시간으로 나누고, 다시 60분씩, 또 60초씩 나눴습니다.',
        '그래서 1초는 평균 태양일의 8만 6천 400분의 1이었죠. 하지만 지구의 자전 속도는 조금씩 달라집니다.',
        '지구의 하루가 완전히 일정하지 않으니, 더 안정적인 기준이 필요했습니다. 1960년에는 1900년을 기준으로 한 열대년을 나눠 1초를 정했습니다.',
        '열대년은 지구가 태양을 도는 시간을 바탕으로 합니다. 그런데 천문 관측보다 더 정밀한 원자시계가 등장했어요.',
        '원자시계는 세슘 133 원자의 두 에너지 상태 사이의 전이에 맞는 마이크로파 진동을 셉니다. 마이크로파는 눈에 보이지 않는 전파의 한 종류예요.',
        '그 진동을 기준으로 삼자고 합의한 곳은 국제도량형총회, 곧 각국이 측정 단위를 정하는 국제 회의였습니다.',
        '1967년, 국제도량형총회는 세슘 원자의 진동 91억 9천 263만 1천 770번을 1초로 정했습니다.',
        '2018년에는 같은 기준을 더 정확한 과학 표현으로 다듬었습니다. 진동 횟수는 바뀌지 않았어요.',
        '오늘날의 1초는 세슘 133 원자에 맞춘 특정한 마이크로파의 진동이 91억 9천 263만 1천 770번 반복되는 시간입니다.',
        '하늘을 보며 나눈 하루에서, 원자의 리듬을 세는 초로. 1초는 한 사람의 발명이 아니라, 더 정확한 시간을 찾으려는 사람들의 합의입니다.',
      ],
    },
    cn: {
      htmlLang: 'zh-CN', pageTitle: '一秒是由谁、如何确定的？', switcher: '选择语言',
      text: {
        introKicker: '时间的标准', timeUnit: '时间单位', heroTitle: '一秒由谁<br>决定？', answer: '这不是某一个人的答案', observe: '观测', agree: '共识', standard: '标准',
        sunKicker: '曾以太阳为基准的时间', stoneCaption: '平均太阳日的八万六千四百分之一', orbitYear: '1900 · 回归年',
        atomKicker: '从天空到原子', highEnergy: '高能态', lowEnergy: '低能态', standardsBody: '国际计量大会', countCaption: '铯 133 原子的振荡次数', yearStamp: '1967 · 国际计量大会', refine: '2018 · 以更精确的科学语言表述',
        presentKicker: '今天的一秒', oneSecond: '1秒', presentCaption: '以铯原子稳定的节奏为基准', closing: '从仰望天空划分一天，<br>到计数<em>原子的节奏</em>', closingFoot: '这是人们共同寻找更精确时间的结果',
      },
      captions: [
        '一秒是谁定下来的？令人意外的是，并非某一个人决定的。',
        '这是人们经过漫长时间，共同寻找更精确标准的结果。',
        '最初，人们把一天分成 24 小时，再分成 60 分钟和 60 秒。',
        '因此，一秒曾是平均太阳日的八万六千四百分之一。但地球自转速度会缓慢变化。',
        '一天并非完全恒定，所以人们需要更稳定的标准。1960 年，人们以 1900 年为基准，将回归年划分来定义一秒。',
        '回归年以地球绕太阳运行的时间为基础。后来，原子钟的精度超过了天文观测。',
        '原子钟测量与铯 133 原子两种能态之间跃迁相对应的微波振荡。微波是看不见的无线电波。',
        '各国在国际计量大会上达成共识，把这种振荡作为时间标准。',
        '1967 年，国际计量大会将铯原子的 9,192,631,770 次振荡定为一秒。',
        '2018 年，这一定义改用更精确的科学表述，振荡次数并没有改变。',
        '今天的一秒，是与铯 133 原子对应的特定微波振荡 9,192,631,770 次所经历的时间。',
        '从仰望天空划分一天，到计数原子的节奏。一秒不是某个人的发明，而是人们共同追求更精确时间的结果。',
      ],
    },
    jp: {
      htmlLang: 'ja', pageTitle: '1秒は誰が、どう決めたの？', switcher: '言語を選択',
      text: {
        introKicker: '時間の基準', timeUnit: '時間の単位', heroTitle: '1秒は誰が<br>決めたの？', answer: '一人だけの答えではありません', observe: '観測', agree: '合意', standard: '標準',
        sunKicker: '太陽を基準に測った時間', stoneCaption: '平均太陽日の8万6400分の1', orbitYear: '1900年 · 回帰年',
        atomKicker: '空から原子へ', highEnergy: '高いエネルギー', lowEnergy: '低いエネルギー', standardsBody: '国際度量衡総会', countCaption: 'セシウム133原子の振動回数', yearStamp: '1967年 · 国際度量衡総会', refine: '2018年 · 定義をより厳密な表現に',
        presentKicker: '現在の1秒', oneSecond: '1秒', presentCaption: 'セシウム原子の安定したリズムを基準に', closing: '空を見上げて刻んだ時間から<br><em>原子のリズム</em>を数える時間へ', closingFoot: 'より正確な時間を求めた人々の合意',
      },
      captions: [
        '1秒は誰が決めたのでしょう？意外にも、一人で決めたものではありません。',
        '長い年月をかけ、人々がより正確な基準を共に定めてきた結果です。',
        'かつて人々は1日を24時間に分け、さらに60分、60秒へと分けました。',
        'そのため、1秒は平均太陽日の8万6400分の1でした。しかし地球の自転速度は少しずつ変化します。',
        '1日の長さは完全には一定でないため、より安定した基準が必要でした。1960年には1900年を基準とする回帰年から1秒が定められました。',
        '回帰年は地球が太陽の周りを公転する時間を基にしています。その後、天文観測より精密な原子時計が登場しました。',
        '原子時計はセシウム133原子の二つのエネルギー状態間の遷移に対応するマイクロ波の振動を数えます。マイクロ波は目に見えない電波の一種です。',
        'その振動を基準にすることが、各国が単位を決める国際度量衡総会で合意されました。',
        '1967年、国際度量衡総会はセシウム原子の9,192,631,770回の振動を1秒と定めました。',
        '2018年には同じ基準を、より厳密な科学的表現に改めました。振動回数は変わっていません。',
        '現在の1秒は、セシウム133原子に対応する特定のマイクロ波が9,192,631,770回振動する時間です。',
        '空を見上げて刻んだ一日から、原子のリズムを数える時間へ。1秒は一人の発明ではなく、より正確な時間を求めた人々の合意です。',
      ],
    },
    en: {
      htmlLang: 'en', pageTitle: 'Who decided how long a second is?', switcher: 'Choose language',
      text: {
        introKicker: 'The standard of time', timeUnit: 'A unit of time', heroTitle: 'Who decided<br>the second?', answer: 'No single person decided', observe: 'Observe', agree: 'Agree', standard: 'Standard',
        sunKicker: 'Time once measured by the Sun', stoneCaption: 'One second: 1/86,400 of a mean solar day', orbitYear: '1900 · tropical year',
        atomKicker: 'From sky to atom', highEnergy: 'Higher energy', lowEnergy: 'Lower energy', standardsBody: 'General Conference on Weights and Measures', countCaption: 'Oscillations of a cesium-133 atom', yearStamp: '1967 · General Conference on Weights and Measures', refine: '2018 · A more precise wording of the definition',
        presentKicker: 'The second today', oneSecond: '1 second', presentCaption: 'Based on the steady rhythm of the cesium atom', closing: 'From measuring days by the sky<br>to counting the <em>rhythm of atoms</em>', closingFoot: 'A shared effort to measure time more precisely',
      },
      captions: [
        'Who decided how long a second is? Surprisingly, it was not one person.',
        'It is the result of people working together over time to find a more precise standard.',
        'People first divided a day into 24 hours, then into 60 minutes and 60 seconds.',
        'So a second was once 1/86,400 of the mean solar day. But Earth’s rotation changes slightly.',
        'Because the length of a day is not perfectly constant, a steadier standard was needed. In 1960, the second was defined from the tropical year, using 1900 as a reference.',
        'The tropical year is based on Earth’s journey around the Sun. Then atomic clocks surpassed astronomical observations in precision.',
        'An atomic clock counts microwave oscillations that match a transition between two energy states of cesium-133. Microwaves are invisible radio waves.',
        'The General Conference on Weights and Measures, where countries agree on measurement standards, adopted that approach.',
        'In 1967, the conference defined one second as 9,192,631,770 oscillations of the cesium atom.',
        'In 2018, the same standard was expressed more precisely. The number of oscillations did not change.',
        'Today, one second is the time taken for 9,192,631,770 periods of radiation matching a transition in cesium-133.',
        'From measuring days by the sky to counting the rhythm of atoms, the second is not one person’s invention. It is a shared effort to measure time more precisely.',
      ],
    },
  };

  const selectors = {
    introKicker: '#s01 .scene-kicker', timeUnit: '.hero-copy p', heroTitle: '.hero-copy h1', answer: '.answer',
    observe: '.gathering span:nth-of-type(1)', agree: '.gathering span:nth-of-type(2)', standard: '.gathering span:nth-of-type(3)',
    sunKicker: '#s02 .scene-kicker', stoneCaption: '.stone-caption', orbitYear: '.orbit-year',
    atomKicker: '#s03 .scene-kicker', highEnergy: '.level-top', lowEnergy: '.level-bottom', standardsBody: '.standard-plate', countCaption: '.count-caption', yearStamp: '.year-stamp', refine: '.refine',
    presentKicker: '#s04 .scene-kicker', oneSecond: '.one-second', presentCaption: '.present-caption', closing: '.closing', closingFoot: '.closing-foot',
  };

  const params = new URLSearchParams(location.search);
  const supported = Object.keys(copy);
  let language = params.get('lang');
  if (!supported.includes(language)) {
    try { language = localStorage.getItem('one-second-history-language'); } catch (_) { language = null; }
  }
  if (!supported.includes(language)) language = 'ko';

  function applyLanguage(next) {
    const selected = copy[next];
    if (!selected) return;
    document.documentElement.lang = selected.htmlLang;
    document.title = selected.pageTitle;
    document.querySelector('#language-switcher').setAttribute('aria-label', selected.switcher);
    for (const [key, selector] of Object.entries(selectors)) {
      const node = document.querySelector(selector);
      if (!node) continue;
      const value = selected.text[key];
      if (key === 'heroTitle' || key === 'closing') node.innerHTML = value;
      else node.textContent = value;
    }
    window.VIDEO_DATA.lang = next;
    window.VIDEO_DATA.cues.forEach((cue, index) => {
      cue.text = selected.captions[index];
      cue.say = selected.captions[index];
    });
    document.querySelectorAll('#language-switcher button').forEach((button) => {
      const active = button.dataset.language === next;
      button.setAttribute('aria-pressed', String(active));
    });
  }

  applyLanguage(language);
  document.querySelectorAll('#language-switcher button').forEach((button) => {
    button.addEventListener('click', () => {
      const next = button.dataset.language;
      if (next === language) return;
      try { localStorage.setItem('one-second-history-language', next); } catch (_) { /* language still changes for this visit */ }
      const url = new URL(location.href);
      url.searchParams.set('lang', next);
      if (window.Video && Number.isFinite(window.Video.time)) url.searchParams.set('t', window.Video.time.toFixed(2));
      location.href = url.toString();
    });
  });
})();
