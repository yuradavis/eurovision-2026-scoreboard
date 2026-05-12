import React from 'react'
import PageContainer from '../components/layout/PageContainer'
import SectionCard from '../components/ui/SectionCard'

const RULES_SECTIONS = [
  {
    id: 'semi',
    badge: 'Semi Final',
    title: 'Як працюють Semi Finals',
    accent: 'pink',
    emoji: '🎤',
    content: [
      {
        heading: 'Що таке Semi Final?',
        text: 'Semi Final — це відбірковий тур Eurovision. У 2026 році проводяться два Semi Finals: перший (12 травня) та другий (14 травня). З кожного туру до Grand Final виходить по 10 країн.',
      },
      {
        heading: 'Як голосувати?',
        text: 'Semi Finals — це система рейтингу виступів. Ти можеш поставити будь-який бал від 1 до 12 кожній країні незалежно. Бали можуть повторюватися — декілька країн можуть отримати 12 балів одночасно. Це оцінка, а не розподіл.',
      },
      {
        heading: 'Хто голосує?',
        text: 'Усі учасники нашої групи оцінюють виступи під час ефіру. Отримані бали підсумовуються — і результати Semi Finals автоматично формують Public Vote для Grand Final.',
      },
    ],
  },
  {
    id: 'public',
    badge: 'Public Vote',
    title: 'Як формується Public Vote',
    accent: 'cyan',
    emoji: '📱',
    content: [
      {
        heading: 'Що таке Public Vote?',
        text: 'Public Vote — це автоматичне телеголосування, що генерується з результатів Semi Finals. Окремого голосування під час Grand Final немає — система сама розраховує бали на основі ваших оцінок у Semi Final 1 та Semi Final 2.',
      },
      {
        heading: 'Як розраховуються бали?',
        text: 'Система підсумовує всі отримані бали з Semi Final 1 та Semi Final 2 для кожної країни. Потім сортує країни за сумою та конвертує топ-10 у шкалу Eurovision: 1-е місце → 12, 2-е → 10, 3-є → 8, 4-е → 7, 5-е → 6, 6-е → 5, 7-е → 4, 8-е → 3, 9-е → 2, 10-е → 1. Решта отримують 0.',
      },
      {
        heading: 'Big 5 + Австрія',
        text: 'Франція, Німеччина, Італія, Великобританія та Австрія (хост) не виступали у Semi Finals. Тому вони не беруть участі у Public Vote і автоматично отримують 0 балів від публіки. Їхній результат у фіналі визначається виключно Jury Points.',
      },
    ],
  },
  {
    id: 'jury',
    badge: 'Jury Points',
    title: 'Як працює Jury Voting',
    accent: 'purple',
    emoji: '⭐',
    content: [
      {
        heading: 'Що таке Jury Points?',
        text: 'Jury Voting — це твоє особисте голосування як «журі» у Grand Final. Ти розподіляєш бали 1–12 між усіма 25 учасниками Grand Final на основі їхніх виступів.',
      },
      {
        heading: 'Шкала балів — кожен бал лише один раз',
        text: 'Доступні значення: 1, 2, 3, 4, 5, 6, 7, 8, 10 та 12 балів. Кожне значення можна використати лише один раз — як у справжньому Eurovision. Якщо ти вже дав 12 балів Швеції, кнопка «12» стає недоступною для всіх інших. «12 Points Go To…» — найважливіший вибір!',
      },
      {
        heading: 'Прозорість результатів',
        text: 'Jury Leaderboard оновлюється в реальному часі — всі бачать результати одразу після голосування кожного учасника.',
      },
    ],
  },
  {
    id: 'winner',
    badge: 'Grand Final',
    title: 'Як визначається переможець',
    accent: 'blue',
    emoji: '🏆',
    content: [
      {
        heading: 'Підрахунок балів',
        text: 'Підсумковий результат = Jury Points (від усіх учасників групи) + Public Vote (автоматично конвертований з результатів Semi Finals). Країна з найбільшою кількістю балів перемагає.',
      },
      {
        heading: 'Grand Final Leaderboard',
        text: 'Leaderboard оновлюється в реальному часі. У таблиці видно окремо: Jury балів, Public балів та Total. Слідкуй за рейтингом у розділі Grand Final → Leaderboard.',
      },
      {
        heading: 'Рівність балів',
        text: 'У разі рівності балів перевага надається країні з вищим результатом у Public Vote — як у справжньому Eurovision!',
      },
    ],
  },
]

export default function Rules() {
  return (
    <PageContainer
      badge="Rules"
      title="Правила гри"
      subtitle="Все, що потрібно знати для участі у Eurovision 2026 Friends Scoreboard"
    >
      <div className="space-y-6">

        {/* Quick overview */}
        <SectionCard accent="pink" className="bg-gradient-to-br from-neon-pink/10 to-transparent">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🎤', label: 'Semi Final 1', value: '15 країн' },
              { icon: '🎵', label: 'Semi Final 2', value: '15 країн' },
              { icon: '🌟', label: 'Grand Final', value: '25 країн' },
              { icon: '🏆', label: 'Max балів', value: '12 Points' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="text-center p-4 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                <div className="text-2xl mb-2">{icon}</div>
                <p className="text-white/40 text-xs font-body">{label}</p>
                <p className="font-display font-black text-white text-base mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Rules sections */}
        {RULES_SECTIONS.map(({ id, badge, title, accent, emoji, content }) => (
          <SectionCard key={id} badge={badge} title={`${emoji} ${title}`} accent={accent}>
            <div className="space-y-5 mt-4">
              {content.map(({ heading, text }) => (
                <div key={heading} className="border-l-2 border-white/[0.08] pl-4">
                  <h3 className="font-display font-bold text-white/80 text-sm mb-1">{heading}</h3>
                  <p className="text-white/45 text-sm font-body leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        ))}

        {/* Eurovision terminology note */}
        <SectionCard title="📖 Глосарій термінів" accent="none" subtitle="Офіційні Eurovision терміни">
          <div className="mt-4 space-y-3">
            {[
              ['Semi Final',      'Відбірковий тур — рейтингове голосування за виступи'],
              ['Grand Final',     'Фінал Eurovision Song Contest'],
              ['Jury Points',     'Бали від журі — кожен бал унікальний (1–12)'],
              ['Public Vote',     'Автоматичне телеголосування з результатів Semi Finals'],
              ['Big 5 + Host',    'Франція, Німеччина, Італія, UK, Австрія — без Public Vote'],
              ['Running Order',   'Порядок виступу країн'],
              ['Leaderboard',     'Таблиця рейтингу'],
              ['12 Points Go To…','Оголошення найвищого балу журі'],
              ['Voting Closed',   'Голосування завершено'],
            ].map(([term, definition]) => (
              <div key={term} className="flex items-start gap-3 py-2 border-b border-white/[0.04] last:border-0">
                <span className="font-mono text-xs text-neon-pink bg-neon-pink/10 border border-neon-pink/20 rounded-md px-2 py-0.5 shrink-0 mt-0.5">
                  {term}
                </span>
                <span className="text-white/40 text-sm font-body">{definition}</span>
              </div>
            ))}
          </div>
        </SectionCard>

      </div>
    </PageContainer>
  )
}
