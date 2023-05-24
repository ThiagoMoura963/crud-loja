-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `compras` INTEGER NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cliente_telefone_key`(`telefone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `marca` VARCHAR(191) NOT NULL,
    `fornecedor` VARCHAR(191) NOT NULL,
    `classificacao` VARCHAR(191) NOT NULL,
    `precoCusto` DOUBLE NOT NULL,
    `precoVenda` DOUBLE NOT NULL,
    `qtdEstoque` INTEGER NOT NULL,
    `qtdLoja` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venda` (
    `nroVenda` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `valor` DOUBLE NOT NULL,
    `vendedor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nroVenda`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProdutoToVenda` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProdutoToVenda_AB_unique`(`A`, `B`),
    INDEX `_ProdutoToVenda_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Venda` ADD CONSTRAINT `Venda_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProdutoToVenda` ADD CONSTRAINT `_ProdutoToVenda_A_fkey` FOREIGN KEY (`A`) REFERENCES `Produto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProdutoToVenda` ADD CONSTRAINT `_ProdutoToVenda_B_fkey` FOREIGN KEY (`B`) REFERENCES `Venda`(`nroVenda`) ON DELETE CASCADE ON UPDATE CASCADE;
