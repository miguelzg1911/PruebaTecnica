# PruebaTecnica

# Sistema de Gestión de Visitas Técnicas "Electra Field"

Este proyecto es una solución integral para la gestión de servicios técnicos residenciales de la empresa **Electra**, enfocada en optimizar la atención en Santiago de Cali mediante la reducción de visitas fallidas y la mejora de la experiencia del cliente.

---

## 1. Solución Propuesta (Descripción de Alto Nivel)
La plataforma permite a los usuarios residenciales (Estratos 1-3+) autogestionar sus citas técnicas. Se basa en una arquitectura desacoplada que garantiza escalabilidad y facilidad de mantenimiento.

### Diagrama Conceptual Simple

```mermaid
graph LR
    A[Customer Web - React] -- "Solicitudes REST" --> B[Backend - .NET 8 API]
    B -- "Persistencia EF Core" --> C[(Base de Datos - SQLite)]
