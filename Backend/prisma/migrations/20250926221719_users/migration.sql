-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `rol` ENUM('ADMIN', 'TECNICO', 'PRODUCTOR', 'ANALISTA') NOT NULL DEFAULT 'PRODUCTOR',
    `telefono` VARCHAR(191) NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Finca` (
    `id_finca` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `latitud` DOUBLE NULL,
    `longitud` DOUBLE NULL,
    `area_total` DOUBLE NULL,
    `direccion` VARCHAR(191) NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_finca`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cultivo` (
    `id_cultivo` INTEGER NOT NULL AUTO_INCREMENT,
    `id_finca` INTEGER NOT NULL,
    `nombreCultivo` VARCHAR(191) NULL,
    `tipoCultivo` VARCHAR(191) NOT NULL,
    `variedad` VARCHAR(191) NULL,
    `areaAsignada` DOUBLE NULL,
    `fechaInicio` DATETIME(3) NULL,
    `fechaFin` DATETIME(3) NULL,
    `estado` ENUM('ACTIVO', 'FINALIZADO', 'PLANIFICADO') NOT NULL DEFAULT 'PLANIFICADO',
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_cultivo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LaborAgricola` (
    `id_labor` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cultivo` INTEGER NOT NULL,
    `tipoLabor` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `fecha` DATETIME(3) NOT NULL,
    `costo` DOUBLE NOT NULL DEFAULT 0,
    `duracionHoras` DOUBLE NULL,
    `realizadoPor` INTEGER NULL,

    PRIMARY KEY (`id_labor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ManejoAgronomico` (
    `id_manejo` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cultivo` INTEGER NOT NULL,
    `categoria` ENUM('FERTILIZANTE', 'HERBICIDA', 'ENMIENDA', 'SERVICIO', 'OTRO') NOT NULL DEFAULT 'OTRO',
    `nombreInsumo` VARCHAR(191) NOT NULL,
    `presentacion` VARCHAR(191) NULL,
    `cantidad` DOUBLE NULL,
    `unidad` VARCHAR(191) NULL,
    `costo` DOUBLE NOT NULL DEFAULT 0,
    `fecha` DATETIME(3) NOT NULL,
    `proveedor` VARCHAR(191) NULL,
    `notas` VARCHAR(191) NULL,

    PRIMARY KEY (`id_manejo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aplicacion` (
    `id_aplicacion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cultivo` INTEGER NOT NULL,
    `tipoAplicacion` ENUM('INSECTICIDA', 'FUNGICIDA', 'ACARICIDA', 'OTRO') NOT NULL DEFAULT 'OTRO',
    `producto` VARCHAR(191) NOT NULL,
    `dosis` VARCHAR(191) NULL,
    `volumen` DOUBLE NULL,
    `unidad` VARCHAR(191) NULL,
    `costo` DOUBLE NOT NULL DEFAULT 0,
    `fecha` DATETIME(3) NOT NULL,
    `operadorId` INTEGER NULL,
    `observaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`id_aplicacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cosecha` (
    `id_cosecha` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cultivo` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `cantidad` DOUBLE NOT NULL,
    `unidad` VARCHAR(191) NOT NULL DEFAULT 'kg',
    `calidad` ENUM('ALTA', 'MEDIA', 'BAJA') NOT NULL DEFAULT 'MEDIA',
    `precioUnitario` DOUBLE NULL DEFAULT 0,
    `notas` VARCHAR(191) NULL,

    PRIMARY KEY (`id_cosecha`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CostoAdicional` (
    `id_costo` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cultivo` INTEGER NULL,
    `id_finca` INTEGER NULL,
    `tipoCosto` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `monto` DOUBLE NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `relacionadoCon` VARCHAR(191) NULL,

    PRIMARY KEY (`id_costo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transporte` (
    `id_transporte` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cosecha` INTEGER NULL,
    `fecha` DATETIME(3) NOT NULL,
    `origen` VARCHAR(191) NULL,
    `destino` VARCHAR(191) NULL,
    `distanciaKm` DOUBLE NULL,
    `costo` DOUBLE NOT NULL,
    `comentario` VARCHAR(191) NULL,

    PRIMARY KEY (`id_transporte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnalisisFinanciero` (
    `id_analisis` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cultivo` INTEGER NOT NULL,
    `periodoInicio` DATETIME(3) NULL,
    `periodoFin` DATETIME(3) NULL,
    `ingresosTotales` DOUBLE NOT NULL DEFAULT 0,
    `costosTotales` DOUBLE NOT NULL DEFAULT 0,
    `utilidad` DOUBLE NULL,
    `rentabilidad` DOUBLE NULL,
    `notas` VARCHAR(191) NULL,
    `calculadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_analisis`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Finca` ADD CONSTRAINT `Finca_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cultivo` ADD CONSTRAINT `Cultivo_id_finca_fkey` FOREIGN KEY (`id_finca`) REFERENCES `Finca`(`id_finca`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaborAgricola` ADD CONSTRAINT `LaborAgricola_id_cultivo_fkey` FOREIGN KEY (`id_cultivo`) REFERENCES `Cultivo`(`id_cultivo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaborAgricola` ADD CONSTRAINT `LaborAgricola_realizadoPor_fkey` FOREIGN KEY (`realizadoPor`) REFERENCES `Usuario`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ManejoAgronomico` ADD CONSTRAINT `ManejoAgronomico_id_cultivo_fkey` FOREIGN KEY (`id_cultivo`) REFERENCES `Cultivo`(`id_cultivo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aplicacion` ADD CONSTRAINT `Aplicacion_id_cultivo_fkey` FOREIGN KEY (`id_cultivo`) REFERENCES `Cultivo`(`id_cultivo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aplicacion` ADD CONSTRAINT `Aplicacion_operadorId_fkey` FOREIGN KEY (`operadorId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cosecha` ADD CONSTRAINT `Cosecha_id_cultivo_fkey` FOREIGN KEY (`id_cultivo`) REFERENCES `Cultivo`(`id_cultivo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CostoAdicional` ADD CONSTRAINT `CostoAdicional_id_cultivo_fkey` FOREIGN KEY (`id_cultivo`) REFERENCES `Cultivo`(`id_cultivo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CostoAdicional` ADD CONSTRAINT `CostoAdicional_id_finca_fkey` FOREIGN KEY (`id_finca`) REFERENCES `Finca`(`id_finca`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transporte` ADD CONSTRAINT `Transporte_id_cosecha_fkey` FOREIGN KEY (`id_cosecha`) REFERENCES `Cosecha`(`id_cosecha`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnalisisFinanciero` ADD CONSTRAINT `AnalisisFinanciero_id_cultivo_fkey` FOREIGN KEY (`id_cultivo`) REFERENCES `Cultivo`(`id_cultivo`) ON DELETE RESTRICT ON UPDATE CASCADE;
