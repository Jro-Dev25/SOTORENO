// App.jsx
import React, { useState } from 'react';

// IMÁGENES
import Arrow from "./IMGs/flecha.png";
import Logo from './IMGs/logo_nobg.png';
import MainPic from "./IMGs/main pic.png";
import Cabaña from "./IMGs/cabaña.jpg";
import Libreria from "./IMGs/casa4.jpg";
import Casa7 from "./IMGs/casa7.jpg";
import Casa1 from "./IMGs/casa1.png";
import Casa6 from "./IMGs/casa6.png";
import Casa8 from "./IMGs/casa8.png";
import Casa2 from "./IMGs/casa2.png";
import WhatsAppLogo from "./IMGs/WHAPP.png";
import LogoTel from "./IMGs/LOGO_TEL.png";
import LogoFooter from "./IMGs/LOGO_CON_TITULO.png";

// ESTILOS
import './App.css';

const App = () => {
  // Estados
  const [modalidad, setModalidad] = useState('presencial');

  const [reunionData, setReunionData] = useState({
    nombre: '', email: '', telefono: '', fecha: '', hora: '',
    tipoProyecto: '', descripcion: ''
  });

  const [mensajeData, setMensajeData] = useState({
    nombre: '', email: '', telefono: '', mensaje: ''
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Validación de email
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Función reutilizable para enviar a EmailJS
  const sendToEmailJS = async (templateId, extraParams = {}) => {
    setLoading(true);
    setStatusMessage('Enviando...');

    try {
      const payload = {
        service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_zk58shu',
        template_id: templateId,
        user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'lKXd4kSclUNvsutKw',
        template_params: {
          to_email: import.meta.env.VITE_EMAIL_TO || 'jairodevk@gmail.com',
          ...extraParams
        }
      };

      console.log('Enviando a EmailJS →', JSON.stringify(payload, null, 2));

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      console.log('Respuesta HTTP:', response.status);

      if (response.ok) {
        return { success: true, msg: '¡Enviado exitosamente!' };
      } else {
        const errorText = await response.text();
        console.error('Error EmailJS:', errorText);
        return { success: false, msg: `Error: ${errorText || 'intenta de nuevo'}` };
      }
    } catch (err) {
      console.error('Error al conectar:', err);
      return { success: false, msg: 'Error de conexión. Revisa tu internet.' };
    } finally {
      setLoading(false);
    }
  };

  // AGENDAR REUNIÓN
  const agendarReunion = async () => {
    if (!reunionData.nombre.trim() || !reunionData.email.trim() || !reunionData.telefono.trim()) {
      setStatusMessage('Completa nombre, email y teléfono');
      setTimeout(() => setStatusMessage(''), 4000);
      return;
    }

    if (!validateEmail(reunionData.email)) {
      setStatusMessage('Email inválido');
      setTimeout(() => setStatusMessage(''), 4000);
      return;
    }

    const result = await sendToEmailJS(
      import.meta.env.VITE_EMAILJS_TEMPLATE_REUNION || 'template_ilhs5ii',
      {
        from_name: reunionData.nombre,
        from_email: reunionData.email,
        reply_to: reunionData.email,
        telefono: reunionData.telefono,
        modalidad,
        fecha: reunionData.fecha || 'No especificada',
        hora: reunionData.hora || 'No especificada',
        tipo_proyecto: reunionData.tipoProyecto || 'No especificado',
        descripcion: reunionData.descripcion || 'Sin descripción'
      }
    );

    setStatusMessage(result.msg);
    if (result.success) {
      setReunionData({
        nombre: '', email: '', telefono: '', fecha: '', hora: '',
        tipoProyecto: '', descripcion: ''
      });
    }
    setTimeout(() => setStatusMessage(''), 6000);
  };

  // ENVIAR MENSAJE
  const enviarMensaje = async () => {
    if (!mensajeData.nombre.trim() || !mensajeData.email.trim() || !mensajeData.mensaje.trim()) {
      setStatusMessage('Completa nombre, email y mensaje');
      setTimeout(() => setStatusMessage(''), 4000);
      return;
    }

    if (!validateEmail(mensajeData.email)) {
      setStatusMessage('Email inválido');
      setTimeout(() => setStatusMessage(''), 4000);
      return;
    }

    const result = await sendToEmailJS(
      import.meta.env.VITE_EMAILJS_TEMPLATE_MENSAJE || 'template_ooyunbg',
      {
        from_name: mensajeData.nombre,
        from_email: mensajeData.email,
        reply_to: mensajeData.email,
        telefono: mensajeData.telefono || 'No proporcionado',
        mensaje: mensajeData.mensaje
      }
    );

    setStatusMessage(result.msg);
    if (result.success) {
      setMensajeData({ nombre: '', email: '', telefono: '', mensaje: '' });
    }
    setTimeout(() => setStatusMessage(''), 6000);
  };

  return (
    <section className='Sotoreno'>
      {/* HEADER */}
      <header id='header' className='Header-head'>
        <section className='Header-body'>
          <div className='header-top'>
            <div className='header-titulo'>
              <h2 className="titulo global">Sotoreno</h2>
              <h3>
                Taller de Arquitectura. <br/>
                Sinaloa.
              </h3>
            </div>
            <div className='header-logo'>
              <img src={Logo} alt="Logo Sotoreno" id='logo' />
            </div>
          </div>

          <div className="header-main">
            <div className='header-menu'>
              <img src={Arrow} alt="Flecha menú" className="arrow" id="arrow-main"/>
              <ul>
                <li className="hover"><a href="#nosotros">Nosotros</a></li>
                <li className="hover"><a href="#servicios">Servicios</a></li>
                <li className="hover"><a href="#reuniones">Reuniones</a></li>
                <li className="hover"><a href="#mensaje">Mensajes</a></li>
                <li className="hover"><a href="#contactanos">Contacto</a></li>
              </ul>
            </div>
            <div className="main-pic">
              <img src={MainPic} alt="Imagen principal" id="MainPic" className="img"/>
            </div>
          </div>

          <div className='header-footer'>
            <section className="nosotros-section">
              <h2 id="nosotros">Nosotros</h2> 
              <p>En Sotoreno creemos que la arquitectura es la oportunidad de <span>transformar ideas</span> en espacios que inspiran, conectan y <span>mejoran la vida</span> de las personas.</p>
            </section>
          </div>
        </section>
      </header>

      <hr />

      {/* MAIN - SERVICIOS */}
      <main>
        <section className="servicios-section">
          <div className="servicios-container">
            <div className="servicios-header">   
              <img src={Cabaña} alt="Imagen principal servicios" className="servicios-main-img" />
              <img src={Libreria} alt="Librería" className="libreria img"/>
              <div className="servicios-twoimg">
                <img src={Casa7} alt="Casa 7" className="casa7 img" />
                <img src={Casa1} alt="Casa 1" className="casa1 img" />
              </div>
              <img src={Casa6} alt="Casa 6" className="casa6 img" />
            </div>
      
            <div className="servicios-body">
              <div className="servicios-lista-box">
                <ul>
                  <h2 id="servicios">Servicios</h2>
                  <li>Residencial</li>
                  <li>Interior</li>
                  <li>Comercial</li>
                  <li>Corporativo</li>
                  <li>Industrial</li>
                  <li>Remodelación</li>
                  <div className="servicios-lista-box_arrow">
                    <img src={Arrow} alt="Flecha servicios" className="arrow arrow_servicios" />
                  </div>
                </ul>
                <div>
                  <img src={Casa8} alt="Casa 8" className="casa8 img"/>
                  <img src={Casa2} alt="Casa 2" className="casa2 img"/>
                </div>
              </div>
            </div>
          </div>

          <div className="servicios-galeria">
            <p className="servicios-desc">
              En Sotoreno creemos que la arquitectura es la oportunidad de <span>transformar ideas</span> en espacios que inspiran...
            </p>
          </div>
        </section>
      </main>

      <hr />

      {/* FOOTER */}
      <footer>
        {statusMessage && (
          <div style={{
            padding: '15px',
            margin: '20px auto',
            maxWidth: '600px',
            backgroundColor: statusMessage.includes('exitosamente') || statusMessage.includes('correctamente') 
              ? '#d4edda' : '#f8d7da',
            color: statusMessage.includes('exitosamente') || statusMessage.includes('correctamente') 
              ? '#155724' : '#721c24',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            {statusMessage}
          </div>
        )}

        {/* AGENDAR REUNIÓN */}
        <section className="parent-reuniones">
          <div className='child-reuniones'>
            <h2 className="global" id="reuniones">Agenda una reunión</h2>
            <p>Selecciona tu modalidad de preferencia:</p>
          </div>
          <div className="arrow-reuniones_container">
            <img src={Arrow} alt="Flecha" className="arrow" id="arrow-reunion" />
          </div>

          <section className="reuniones-form">
            <div className="reuniones-btn">
              <button 
                className={`btn btn_presencial ${modalidad === 'presencial' ? 'active' : ''}`}
                onClick={() => setModalidad('presencial')}
                style={{
                  backgroundColor: modalidad === 'presencial' ? 'rgb(6, 116, 178)' : '#fff',
                  color: modalidad === 'presencial' ? '#fff' : 'rgb(147, 147, 147)'
                }}
              >
                Presencial
              </button>
              <button 
                className={`btn btn_videoconferencia ${modalidad === 'videoconferencia' ? 'active' : ''}`}
                onClick={() => setModalidad('videoconferencia')}
                style={{
                  backgroundColor: modalidad === 'videoconferencia' ? 'rgb(6, 116, 178)' : '#fff',
                  color: modalidad === 'videoconferencia' ? '#fff' : 'rgb(147, 147, 147)'
                }}
              >
                Videoconferencia
              </button>
            </div>

            <div className="reuniones-inputs">
              <label htmlFor="nombre-reunion">Nombre completo</label>
              <input 
                id="nombre-reunion"
                type="text" 
                value={reunionData.nombre}
                onChange={(e) => setReunionData({...reunionData, nombre: e.target.value})}
                placeholder='Nombre completo' 
                autoComplete="name"
                required
              />            

              <label htmlFor="email-reunion">Email</label>
              <input 
                id="email-reunion"
                type="email" 
                value={reunionData.email}
                onChange={(e) => setReunionData({...reunionData, email: e.target.value})}
                placeholder='Email' 
                autoComplete="email"
                required
              /> 

              <label htmlFor="telefono-reunion">Teléfono</label>
              <input 
                id="telefono-reunion"
                type="tel" 
                value={reunionData.telefono}
                onChange={(e) => setReunionData({...reunionData, telefono: e.target.value})}
                placeholder='+52 (667) 123 456 7' 
                autoComplete="tel"
                required
              />
            </div>

            <div className="reuniones-dates">
              <label htmlFor="fecha-reunion">Fecha</label>
              <input 
                id="fecha-reunion"
                type="date" 
                value={reunionData.fecha}
                onChange={(e) => setReunionData({...reunionData, fecha: e.target.value})}
              />

              <label htmlFor="hora-reunion">Hora</label>
              <input 
                id="hora-reunion"
                type="time" 
                value={reunionData.hora}
                onChange={(e) => setReunionData({...reunionData, hora: e.target.value})}
              />
            </div>

            <div className="proyectos">
              <div>
                <label htmlFor="tipo-proyecto">Tipo de proyecto</label>
                <select 
                  id="tipo-proyecto"
                  value={reunionData.tipoProyecto}
                  onChange={(e) => setReunionData({...reunionData, tipoProyecto: e.target.value})}
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="residencial">Residencial</option>
                  <option value="interior">Interior</option>
                  <option value="comercial">Comercial</option>
                  <option value="corporativo">Corporativo</option>
                  <option value="industrial">Industrial</option>
                  <option value="remodelacion">Remodelación</option>
                </select>
              </div>

              <div>
                <label htmlFor="descripcion-reunion">Cuéntanos sobre tu proyecto</label>
                <br />
                <textarea 
                  id="descripcion-reunion"
                  value={reunionData.descripcion}
                  onChange={(e) => setReunionData({...reunionData, descripcion: e.target.value})}
                  placeholder='Tienda de artículos deportivos en remodelación interior, exterior y equipamiento.'
                />
              </div>
            </div>

            <button 
              className="btn agendar_btn" 
              onClick={agendarReunion}
              disabled={loading}
              style={{
                backgroundColor: 'rgb(6, 116, 178)',
                color: 'white',
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Agendando...' : 'Agendar'}
            </button>
          </section>
        </section>

        <hr />
        
        {/* MENSAJE */}
        <section className='mensaje-section'>
          <h2 id="mensaje">Envíanos un mensaje</h2>

          <div className="form-group">
            <label htmlFor="nombre-mensaje">Nombre completo</label>
            <input 
              id="nombre-mensaje"
              type="text" 
              value={mensajeData.nombre}
              onChange={(e) => setMensajeData({...mensajeData, nombre: e.target.value})}
              placeholder='Nombre completo' 
              autoComplete="name"
              required
            />  
          </div>

          <div className="form-group">
            <label htmlFor="email-mensaje">Email</label>
            <input 
              id="email-mensaje"
              type="email" 
              value={mensajeData.email}
              onChange={(e) => setMensajeData({...mensajeData, email: e.target.value})}
              placeholder='Email' 
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono-mensaje">Teléfono</label>
            <input 
              id="telefono-mensaje"
              type="tel" 
              value={mensajeData.telefono}
              onChange={(e) => setMensajeData({...mensajeData, telefono: e.target.value})}
              placeholder='+52 (667) 123 456 7' 
              autoComplete="tel"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mensaje-texto">Mensaje</label>
            <textarea 
              id="mensaje-texto"
              value={mensajeData.mensaje}
              onChange={(e) => setMensajeData({...mensajeData, mensaje: e.target.value})}
              placeholder="¿Trabajarían en un proyecto en Mazatlán?"
              autoComplete="off"
              required
            />
          </div>

          <button 
            className="btn enviar_btn" 
            onClick={enviarMensaje}
            disabled={loading}
            style={{
              backgroundColor: 'rgb(6, 116, 178)',
              color: 'white',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </section>

        <hr />
        
        {/* CONTACTO */}
        <section className="contactanos-section">
          <img src={LogoFooter} alt="Logo footer" className="MainLogoFooter"/>
          <h2 className="global" id="contactanos">Contáctanos</h2>
          <p>Arq. Arturo Soto Moreno</p>
          <p>+52 (667) 123 456 7</p>
          <a href="mailto:sotoreno-99@outlook.com">sotoreno-99@outlook.com</a>
        </section>

        <div className="logosFooter">
          <img src={LogoTel} alt="Logo teléfono" className='logoFooter'/>
          <img src={WhatsAppLogo} alt="Logo WhatsApp" className='logoFooter'/>
        </div>
      </footer>
    </section>
  );
}

export default App;










