import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('API sobre uma companhia', () => {
    const p = pactum;
    const rep = SimpleReporter;
    const baseUrl = 'https://api-desafio-qa.onrender.com/docs/';

    beforeAll(() => p.reporter.add(rep));
    afterAll(() => p.reporter.end());
  
    describe('Criação de uma nova empresa', () => {
        it('Criar um novo registro de uma empresa', async () => {
            await p
                .spec()
                .post(`${baseUrl}/company`)
                .withJson({
                    name: "Tecnologia LTDA",
                    cnpj: "123456",
                    state: "Paraná",
                    city: "Curitiba",
                    address: "Rua Getúlio Vargas",
                    sector: "Desenvolvimento de software"
                })
                .expectStatus(StatusCodes.OK);
        })
    })

    describe('Retorna as empresas cadastradas', () => {
        it('Retorna uma lista de todas as empresas cadastradas', async () => {
            await p
                .spec()
                .get(`${baseUrl}/company`)
                .expectStatus(StatusCodes.OK)
                .withJson({
                    args: {},
                    method: 'GET'
            })
        })
    })

    describe('Atualiza os dados de uma empresa', () => {
        it('Modifica os dados de uma empresa cadastrada', async () => {
            await p
                .spec()
                .put(`${baseUrl}/company`)
                .withBody("cnpj: 123456")
                .withJson({
                    name: "Tecnologia LTDA",
                    cnpj: "987654",
                    state: "Pará",
                    city: "Belém",
                    address: "Rua Floriano Peixoto",
                    sector: "Desenvolvimento de software"
                })
                .expectStatus(StatusCodes.OK)
        })
    })

    describe('Encontra uma empresa pelo ID', () => {
        it('Retorna os detalhes de uma empresa específica com base no ID', async () => {
            await p
                .spec()
                .get(`${baseUrl}/company/1`)
                .expectStatus(StatusCodes.OK)
        })
    })


    // Esse aqui tá dando erro no .delete
    describe('Deleta uma empresa com base no ID dela', () => {
        it('Apaga os registros de uma empresa com base no ID dela', async () => {
            await p
                .spec
                .delete(`${baseUrl}/company/1`)
                .expectStatus(StatusCodes.OK)
        })
    })
})