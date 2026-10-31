import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, MapPin, Menu, MessageCircle, ShieldCheck, Truck, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const phone = '5511947821052'
const message = (text: string) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
const generalMessage = 'Olá! Vim pelo site da 29 Transportes e gostaria de solicitar atendimento para guincho ou transporte de veículo.'

const faqs = [
  { q: 'A 29 Transportes atende quais regiões?', a: 'O atendimento é em Guarulhos e região. Envie sua localização pelo WhatsApp para consultar o serviço.' },
  { q: 'Como solicitar um guincho?', a: 'Envie sua localização e conte pelo WhatsApp o que aconteceu. A equipe orienta você sobre os próximos passos.' },
  { q: 'A empresa realiza transporte de veículos?', a: 'Sim. A 29 Transportes realiza guincho, remoção e transporte de veículos.' },
  { q: 'Como solicitar um orçamento?', a: 'Informe pelo WhatsApp a localização, os dados do veículo e o trajeto desejado para receber orientação sobre o orçamento.' },
]

const clientPhotos = [
  { src: '/clientes/cliente-01.jpg', alt: 'Caminhonete plataforma da 29 Transportes com carga protegida para transporte.' },
  { src: '/clientes/cliente-02.jpg', alt: 'Volkswagen Fusca sendo transportado na plataforma da 29 Transportes.' },
  { src: '/clientes/cliente-03.jpg', alt: 'Veículo branco sendo transportado à noite pela 29 Transportes.' },
  { src: '/clientes/cliente-04.jpg', alt: 'Veículo clássico sendo levado na plataforma da 29 Transportes durante a noite.' },
  { src: '/clientes/cliente-05.jpg', alt: 'Sedã preto sendo transportado na plataforma da 29 Transportes.' },
  { src: '/clientes/cliente-06.jpg', alt: 'Hatch azul sendo transportado na plataforma da 29 Transportes durante a noite.' },
]

function App() {
  const reduceMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLElement>(null)
  const roadRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const progress = max > 0 ? window.scrollY / max : 0
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
      })
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', update)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.header', { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'power2.out' })
      gsap.fromTo('.hero-copy > *', { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .85, stagger: .11, ease: 'power3.out', delay: .16 })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 38, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } })
      })
      if (storyRef.current && roadRef.current && headingRef.current) {
        const timeline = gsap.timeline({ scrollTrigger: { trigger: storyRef.current, start: 'top top', end: 'bottom bottom', scrub: .65 } })
        timeline.to(headingRef.current, { yPercent: -30, opacity: .3, ease: 'none' }, 0)
          .fromTo(roadRef.current, { backgroundPosition: '0% center' }, { backgroundPosition: '100% center', ease: 'none' }, 0)
          .to('.story-orbit', { rotate: 70, scale: 1.08, ease: 'none' }, 0)
      }
      gsap.utils.toArray<HTMLElement>('.service-card').forEach((el, i) => gsap.fromTo(el, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: .65, delay: i * .08, scrollTrigger: { trigger: el, start: 'top 88%', once: true } }))
      gsap.utils.toArray<HTMLElement>('.client-photo-card').forEach((el, i) => gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .6, delay: i * .07, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }))
    })
    return () => ctx.revert()
  }, [reduceMotion])

  const closeMenu = () => setMenuOpen(false)
  const nav = [{ label: 'Início', href: '#inicio' }, { label: 'Serviços', href: '#servicos' }, { label: 'Clientes', href: '#clientes' }, { label: 'Como funciona', href: '#como-funciona' }, { label: 'Sobre', href: '#sobre' }, { label: 'Contato', href: '#contato' }]

  return <>
    <div className="progress" ref={progressRef} />
    <header className="header">
      <a className="brand" href="#inicio" aria-label="29 Transportes, início"><img src="/logo-29-transportes.png" alt="29 Transportes" /></a>
      <nav className="desktop-nav" aria-label="Navegação principal">{nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      <a className="button button-small header-cta" href={message('Olá! Gostaria de solicitar atendimento com a 29 Transportes.')} target="_blank" rel="noopener noreferrer">Solicitar atendimento <ArrowUpRight size={16} /></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .2 }} aria-label="Navegação móvel">{nav.map((item) => <a onClick={closeMenu} key={item.href} href={item.href}>{item.label}<ArrowRight size={18} /></a>)}<a className="mobile-call" href={message(generalMessage)} target="_blank" rel="noopener noreferrer">Chamar no WhatsApp <ArrowUpRight size={18} /></a></motion.nav>}</AnimatePresence>

    <main>
      <section className="hero" id="inicio">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> GUINCHO &nbsp;·&nbsp; TRANSPORTE DE VEÍCULOS</p>
          <h1>SEU VEÍCULO.<br /><span>NOSSO CUIDADO.</span></h1>
          <img className="mobile-hero-logo" src="/logo-29-transportes.png" alt="29 Transportes" width="612" height="408" />
          <p className="hero-description">Guincho e transporte de veículos em Guarulhos e região. Converse diretamente com a equipe e explique o que precisa.</p>
          <div className="hero-actions">
            <a className="button" href={message(generalMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Chamar no WhatsApp <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#servicos">Conhecer serviços <ArrowDown size={15} /></a>
          </div>
          <div className="hero-location"><MapPin size={15} /><span>GUARULHOS E REGIÃO</span><i /><span>ATENDIMENTO DIRETO</span></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-logo-plate"><img src="/logo-29-transportes.png" alt="" /></div>
          <div className="art-ring ring-one" /><div className="art-ring ring-two" />
          <div className="art-caption"><span>PRONTO PARA SEGUIR</span><span className="art-line" /></div>
        </div>
        <a className="scroll-hint" href="#story"><span>ROLE PARA CONTINUAR</span><ArrowDown size={14} /></a>
        <span className="hero-index">01 <i /> 09</span>
      </section>

      <section className="story" id="story" ref={storyRef}>
        <div className="story-sticky">
          <div className="story-copy" data-reveal>
            <p className="eyebrow"><span className="eyebrow-dot" /> QUANDO VOCÊ PRECISA, ESTAMOS A UM TOQUE</p>
            <h2 ref={headingRef}>UM CAMINHO<br />MAIS <em>TRANQUILO.</em></h2>
            <p>Atendimento direto para guincho e transporte de veículos em Guarulhos e região.</p>
            <a className="button button-outline" href={message('Olá! Preciso de ajuda com meu veículo.')} target="_blank" rel="noopener noreferrer">Fale com a equipe <ArrowUpRight size={16} /></a>
          </div>
          <div className="road-stage" ref={roadRef} aria-hidden="true"><div className="road-halo" /><div className="road" /><div className="road-center" /><div className="story-orbit"><img src="/logo-29-transportes.png" alt="" /></div><div className="stage-note">GUARULHOS <i /> SP</div></div>
          <div className="story-foot"><span>02 — 03</span><span>GUINCHO & TRANSPORTE</span></div>
        </div>
      </section>

      <section className="services section-pad" id="servicos">
        <div className="section-head" data-reveal><div><p className="eyebrow"><span className="eyebrow-dot" /> COMO PODEMOS AJUDAR</p><h2>CUIDADO EM<br /><em>CADA TRECHO.</em></h2></div><p className="section-intro">Converse com a equipe para explicar o que você precisa e receber orientação.</p></div>
        <div className="service-grid">
          {[{ no: '01', title: 'Guincho', text: 'Solicite atendimento para guincho em Guarulhos e região. Informe sua localização pelo WhatsApp.', icon: Truck, msg: 'Olá! Preciso solicitar um guincho. Posso informar minha localização?' }, { no: '02', title: 'Remoção', text: 'Conte à equipe o que aconteceu e consulte o atendimento para remoção do veículo.', icon: ShieldCheck, msg: 'Olá! Gostaria de consultar uma remoção de veículo.' }, { no: '03', title: 'Transporte', text: 'Informe o veículo e o trajeto pelo WhatsApp para consultar o transporte.', icon: ArrowRight, msg: 'Olá! Gostaria de consultar o transporte de um veículo.' }].map(({ no, title, text, icon: Icon, msg }) => <article className="service-card" key={no}><div className="card-top"><span>{no} / 03</span><Icon size={22} strokeWidth={1.5} /></div><div className="service-card-copy"><h3>{title}</h3><p>{text}</p></div><a href={message(msg)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar ${title.toLowerCase()} pelo WhatsApp`}><ArrowUpRight size={18} /></a></article>)}
        </div>
      </section>

      <section className="client-gallery section-pad" id="clientes">
        <div className="section-head" data-reveal><div><p className="eyebrow"><span className="eyebrow-dot" /> REGISTROS DE TRANSPORTE</p><h2>CLIENTES<br /><em>NA ESTRADA.</em></h2></div><p className="section-intro">Alguns registros dos transportes realizados pela equipe da 29 Transportes.</p></div>
        <div className="client-gallery-grid">{clientPhotos.map((photo, i) => <figure className="client-photo-card" key={photo.src}><div className={`client-photo-frame ${i === 0 ? 'is-portrait' : ''}`}><img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" /></div><figcaption><span>REGISTRO {String(i + 1).padStart(2, '0')}</span><span>29 TRANSPORTES</span></figcaption></figure>)}</div>
        <a className="client-gallery-cta" href={message('Olá! Vi as fotos dos transportes no site e gostaria de solicitar atendimento.')} target="_blank" rel="noopener noreferrer">Precisa transportar um veículo? <span>Fale com a equipe <ArrowUpRight size={16} /></span></a>
      </section>

      <section className="process section-pad" id="como-funciona">
        <div className="section-head" data-reveal><div><p className="eyebrow"><span className="eyebrow-dot" /> SIMPLES ASSIM</p><h2>O PRÓXIMO PASSO<br /><em>COMEÇA AQUI.</em></h2></div><p className="section-intro">Fale diretamente com a equipe pelo WhatsApp. Veja como começar:</p></div>
        <div className="steps">{[{ n: '01', title: 'Chame no WhatsApp', detail: 'Inicie uma conversa pelo botão de atendimento.' }, { n: '02', title: 'Conte o que precisa', detail: 'Informe sua localização e os detalhes do veículo.' }, { n: '03', title: 'Receba orientação', detail: 'A equipe explica os próximos passos do atendimento.' }].map((step) => <div className="step" data-reveal key={step.n}><span className="step-no">{step.n}</span><div><h3>{step.title}</h3><p>{step.detail}</p></div><Check size={17} className="step-check" /></div>)}</div>
      </section>

      <section className="about section-pad" id="sobre">
        <div className="about-mark" data-reveal><div className="about-logo-plate"><img src="/logo-29-transportes.png" alt="29 Transportes" /></div><span>GUARULHOS · SP</span></div>
        <div className="about-copy" data-reveal><p className="eyebrow"><span className="eyebrow-dot" /> SOBRE A 29</p><h2>MAIS TRANQUILIDADE<br />PARA <em>SEGUIR EM FRENTE.</em></h2><p>A 29 Transportes realiza serviços de guincho, remoção e transporte de veículos em Guarulhos e região. O atendimento começa com uma conversa direta para entender sua necessidade e orientar os próximos passos.</p><p>Fale pelo WhatsApp e explique como podemos ajudar.</p><a className="text-link" href={message('Olá! Gostaria de saber mais sobre a 29 Transportes.')} target="_blank" rel="noopener noreferrer">Fale com a equipe <ArrowUpRight size={16} /></a></div>
      </section>

      <section className="reasons section-pad">
        <div className="section-head" data-reveal><div><p className="eyebrow"><span className="eyebrow-dot" /> 29 TRANSPORTES</p><h2>POR QUE FALAR<br />COM A <em>29?</em></h2></div></div>
        <div className="reason-list">{['Atendimento direto pelo WhatsApp', 'Guincho e transporte de veículos', 'Atendimento em Guarulhos e região', 'Facilidade para solicitar informações'].map((text, i) => <div className="reason" data-reveal key={text}><span>0{i + 1}</span><p>{text}</p><ArrowUpRight size={17} /></div>)}</div>
      </section>

      <section className="faq section-pad" id="faq">
        <div className="faq-title" data-reveal><p className="eyebrow"><span className="eyebrow-dot" /> DÚVIDAS FREQUENTES</p><h2>RESPOSTAS<br />NO <em>CAMINHO.</em></h2><p>Não encontrou o que procura? Chame a gente.</p><a className="text-link" href={message(generalMessage)} target="_blank" rel="noopener noreferrer">Fale pelo WhatsApp <ArrowUpRight size={16} /></a></div>
        <div className="faq-list">{faqs.map(({ q, a }, i) => <div className={`faq-item ${faqOpen === i ? 'is-open' : ''}`} key={q}><button id={`faq-question-${i}`} aria-controls={`faq-answer-${i}`} onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}><span>{q}</span><ChevronDown size={18} /></button><AnimatePresence initial={false}>{faqOpen === i && <motion.div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .25 }}><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div>
      </section>

      <section className="cta" id="contato"><div className="cta-lines" /><div className="cta-content" data-reveal><p className="eyebrow"><span className="eyebrow-dot" /> GUINCHO & TRANSPORTE EM GUARULHOS</p><h2>PRECISA DE<br /><em>GUINCHO?</em></h2><p>Fale com a equipe e informe sua localização.</p><a className="button button-light" href={message(generalMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Chamar agora no WhatsApp <ArrowUpRight size={17} /></a></div><div className="cta-stamp"><img src="/logo-29-transportes.png" alt="29 Transportes" /></div></section>
    </main>

    <footer className="footer"><a className="footer-brand" href="#inicio"><img src="/logo-29-transportes.png" alt="29 Transportes" /></a><p>Guincho e transporte de veículos<br />Guarulhos e região</p><div className="footer-links"><a href="#servicos">Serviços</a><a href="#clientes">Clientes</a><a href="#sobre">Sobre</a><a href="#faq">Dúvidas</a><a href={message(generalMessage)} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={14} /></a></div><span className="copyright">© {new Date().getFullYear()} 29 Transportes</span></footer>
    <a className="floating-whatsapp" href={message(generalMessage)} target="_blank" rel="noopener noreferrer" aria-label="Fale com a 29 Transportes pelo WhatsApp"><MessageCircle size={21} /><span>Falar com a equipe</span></a>
  </>
}

export default App
