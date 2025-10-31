# 📚 Documentación de Componentes

Esta documentación describe la estructura y funcionamiento de los componentes del proyecto.

## 📁 Estructura de Componentes

```
src/components/
├── sections/          # Secciones de la página principal
│   ├── HumorSection.astro
│   ├── LatestSection.astro
│   ├── CultSection.astro
│   └── BestSection.astro
├── PodcastCard.astro  # Tarjeta de podcast con like button
├── VideoPlayer.astro  # Reproductor de video de YouTube
├── Header.astro       # Navegación principal
├── Footer.astro       # Pie de página
└── ToggleTheme.astro  # Botón de cambio de tema
```

---

## 🎴 PodcastCard.astro

**Propósito**: Tarjeta reutilizable para mostrar información de un podcast/episodio.

**Props**:
- `podcast: Podcast` - Objeto con la información del podcast
- `showLikeButton?: boolean` - Mostrar/ocultar botón de like (default: true)

**Características**:
- Muestra miniatura, título, descripción, categoría, rating
- Badge "De Culto" si corresponde
- Botón de like con animaciones
- Enlace al nombre del podcast (si tiene `podcastId`)
- Lazy loading de imágenes
- Soporte para modo oscuro

**Uso**:
```astro
---
import PodcastCard from '../components/PodcastCard.astro';
---

<PodcastCard podcast={podcastData} showLikeButton={true} />
```

---

## 📺 VideoPlayer.astro

**Propósito**: Reproductor embebido de YouTube con información del episodio.

**Props**:
- `podcast: Podcast` - Objeto con la información del podcast

**Características**:
- Reproductor iframe de YouTube
- Información completa del episodio
- Enlace directo a YouTube
- Soporte para modo oscuro

**Uso**:
```astro
---
import VideoPlayer from '../components/VideoPlayer.astro';
---

<VideoPlayer podcast={podcastData} />
```

---

## 🎭 Secciones (sections/)

### HumorSection.astro

**Propósito**: Sección "Mejores Podcasts de Humor" con ordenamiento dinámico.

**Props**:
- `limit?: number` - Número de podcasts a mostrar (default: 6)

**Características**:
- Ordena por prioridad: `(likes × 2) + (rating × 10)`
- Se actualiza dinámicamente cuando cambian los likes
- Enlace a ver todos los podcasts de humor

### LatestSection.astro

**Propósito**: Sección "Últimos Capítulos".

**Props**:
- `limit?: number` - Número de podcasts a mostrar (default: 6)

**Características**:
- Ordena por fecha (más recientes primero)
- Integra likes del localStorage

### CultSection.astro

**Propósito**: Sección "De Culto" con estilo destacado.

**Características**:
- Fondo especial (gradiente amarillo/naranja)
- Muestra solo podcasts marcados como `isCult: true`
- Integra likes del localStorage

### BestSection.astro

**Propósito**: Sección "Mejores Capítulos o Episodios".

**Props**:
- `limit?: number` - Número de podcasts a mostrar (default: 6)

**Características**:
- Ordena por rating (mejor primero)
- Integra likes del localStorage

---

## 🔄 Sistema de Likes

### Funcionamiento

1. **Almacenamiento**: 
   - `localStorage.podcast_likes` - Contador total de likes por podcast
   - `localStorage.user_liked_podcasts` - Array de IDs que el usuario ha dado like

2. **Actualización Dinámica**:
   - Al dar like, se dispara el evento `podcast-liked`
   - La sección de humor se recarga automáticamente
   - Los contadores se actualizan en tiempo real

3. **Prioridad de Ordenamiento**:
   ```typescript
   priority = (likes × 2) + (rating × 10)
   ```

### Utilidades

**Archivo**: `src/utils/likes.ts`

Funciones principales:
- `getPodcastLikes(id)` - Obtiene likes de un podcast
- `likePodcast(id)` - Incrementa likes (ya no se usa directamente)
- `calculatePriority(podcast)` - Calcula prioridad para ordenamiento
- `hasUserLiked(id)` - Verifica si usuario dio like

---

## 🛣️ Rutas Dinámicas

### `/podcast/[id].astro`

Página individual de un episodio:
- Reproductor de video
- Botón de like
- Navegación anterior/siguiente
- Lista de todos los episodios del show

### `/show/[showId].astro`

Página del show completo:
- Información del podcast
- Todos los episodios ordenados por fecha
- Estadísticas del show

---

## 🎨 Estilos y Temas

### Modo Oscuro

Todos los componentes soportan modo oscuro mediante clases de Tailwind:
- `dark:bg-gray-800` - Fondos oscuros
- `dark:text-white` - Texto claro
- `dark:hover:text-purple-300` - Hovers en modo oscuro

### Animaciones

- **Like Button**: Pulso en icono, bounce en contador
- **Cards**: Hover con escala y sombra
- **Transiciones**: Suaves en todos los estados (300ms)

---

## 📊 Gestión de Datos

### Archivo de Datos

**Ubicación**: `src/data/podcasts.ts`

**Funciones Helper**:
- `getPodcastById(id)` - Buscar por ID
- `getPodcastsByCategory(category)` - Filtrar por categoría
- `getLatestPodcasts(limit)` - Episodios más recientes
- `getBestRatedPodcasts(limit)` - Mejor rating
- `getCultPodcasts()` - Solo de culto
- `getHumorPodcasts(limit)` - Solo humor
- `getPodcastsByShow(showId)` - Episodios de un show
- `getPodcastShows()` - Lista de todos los shows

---

## 🚀 Optimizaciones

### Performance

1. **Lazy Loading de Imágenes**:
   ```html
   <img loading="lazy" decoding="async" width="640" height="360" />
   ```

2. **Intersection Observer**:
   - Carga diferida de imágenes fuera del viewport
   - Implementado en `index.astro`

3. **Generación Estática**:
   - Todas las páginas se generan en build time
   - `getStaticPaths()` define las rutas

### Mantenibilidad

1. **Componentes Modulares**:
   - Cada sección es un componente independiente
   - Fácil de mantener y actualizar

2. **TypeScript**:
   - Tipos definidos en `src/types/podcast.ts`
   - Autocompletado y validación

3. **Documentación**:
   - Este archivo
   - Comentarios en el código

---

## 🧪 Testing Recomendado

### Funcionalidades a Probar

1. **Sistema de Likes**:
   - ✅ Dar like desde tarjeta
   - ✅ Dar like desde página individual
   - ✅ Verificar persistencia en localStorage
   - ✅ Verificar actualización de orden en humor section

2. **Navegación**:
   - ✅ Navegación anterior/siguiente
   - ✅ Enlace a show completo
   - ✅ Enlace desde nombre del podcast

3. **Responsive**:
   - ✅ Móvil (< 768px)
   - ✅ Tablet (768px - 1024px)
   - ✅ Desktop (> 1024px)

4. **Modo Oscuro**:
   - ✅ Cambio de tema
   - ✅ Persistencia de preferencia
   - ✅ Todos los componentes

---

## 📝 Notas de Desarrollo

### Agregar Nuevos Podcasts

1. Editar `src/data/podcasts.ts`
2. Agregar objeto con estructura `Podcast`
3. Ejecutar `npm run build` para regenerar páginas

### Modificar Ordenamiento

Editar función `calculatePriority` en `src/utils/likes.ts`:
```typescript
return (likes * 2) + (rating * 10); // Ajustar pesos
```

### Agregar Nueva Sección

1. Crear componente en `src/components/sections/`
2. Importar en `src/pages/index.astro`
3. Agregar en el contenedor

---

## 🔗 Referencias

- [Astro.js Documentation](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

