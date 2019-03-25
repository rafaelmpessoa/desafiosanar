# Desafio Sanar - Rafael Menicuci

### Instalando

Extrair o arquivo e executar o comando

```
npm install
```

### Iniciando

```
npm run start-server
```

## Pré-requisito para os testes

Gerar token de autenticação para o consumo da API:

Enviar requisição POST na url:
```
http://localhost:3000/api/login

```
Toda requisição na API será necessário conter no header o token:
```
x-auth-token:TOKEN
```

## Caso de Mário

Criar custumer (POST)

```
http://localhost:3000/api/customer
```

objeto POST:
```
{
	"name": "Mario",
	"email": "mario10@mario.com.br",
	"creditCard": [
		{
			"number" : "346051440042071",
			"cvv": "999",
			"holder_name": "MARIO",
			"exp_month": 2,
			"exp_year": 21
		}
		]
}
```
retorno POST:
```
{
    "type": "individual",
    "_id": "5c98311bd9f19a1efd2c6908",
    "name": "Mario",
    "email": "mario10@mario.com.br",
    "creditCard": [
        {
            "inUse": true,
            "_id": "5c98311bd9f19a1efd2c6909",
            "number": "346051440042071",
            "cvv": "999",
            "holder_name": "MARIO",
            "exp_month": 2,
            "exp_year": 21
        }
    ],
    "_idCustomerMP": "cus_ZEBReoH2rsdq4VQ6",
    "__v": 0
}
```
Criar plano Mensal:
```
http://localhost:3000/api/plan
```
obj POST:
```
{
  "name": "Mensal",
  "items": [
    {
      "name": "Sanarflix",
      "quantity": 1,
	      "pricing_scheme": {
        "price": 3000
      }
    }
  ],
  "interval": "month",
  "interval_count": 1,
  "minimum_price": 3000,
  "trial_period_days": 1,
  "metadata": {
  	"id": "mensal"
  }
}
```
retorno POST:
```
{
    "_id": "5c9836811d5ae422f13036de",
    "name": "Mensal",
    "_idPlanMP": "plan_wv50XWPTdu3PDZn2",
    "__v": 0
}
```
Criando assinatura:
```
http://localhost:3000/api/signature
```
obj POST:
```
{
	"_idCustomer": "5c98311bd9f19a1efd2c6908",
	"_idCustomerMP": "cus_ZEBReoH2rsdq4VQ6",
	"_idPlan": "5c9836811d5ae422f13036de",
	"_idPlanMP":"plan_wv50XWPTdu3PDZn2",
	"payment_method": "credit_card"
}
```
obj retorno:
```
{
    "_id": "5c983b601464dd26067b351a",
    "_idCustomer": "5c98311bd9f19a1efd2c6908",
    "_idCustomerMP": "cus_ZEBReoH2rsdq4VQ6",
    "_idPlan": "5c9836811d5ae422f13036de",
    "_idPlanMP": "plan_wv50XWPTdu3PDZn2",
    "payment_method": "credit_card",
    "card": {
        "inUse": true,
        "_id": "5c98311bd9f19a1efd2c6909",
        "number": "346051440042071",
        "cvv": "999",
        "holder_name": "MARIO",
        "exp_month": 2,
        "exp_year": 21
    },
    "_idSignatureMP": "sub_W9Rr6eSoRCaBnb0N",
    "__v": 0
}
```



## Caso de Juliana

Criar custumer (POST)

```
http://localhost:3000/api/customer
```

objeto POST:
```
{
	"name": "Juliana",
	"email": "juliana@juliana.com.br",
	"creditCard": [
		{
			"number" : "346051440042071",
			"cvv": "999",
			"holder_name": "JULIANA",
			"exp_month": 2,
			"exp_year": 21
		}
		]
}
```
retorno POST:
```
{
    "type": "individual",
    "_id": "5c983294d9f19a1efd2c690b",
    "name": "Juliana",
    "email": "juliana@juliana.com.br",
    "creditCard": [
        {
            "inUse": true,
            "_id": "5c983294d9f19a1efd2c690c",
            "number": "346051440042071",
            "cvv": "999",
            "holder_name": "JULIANA",
            "exp_month": 2,
            "exp_year": 21
        }
    ],
    "_idCustomerMP": "cus_EGKWjofBzUdVZLwQ",
    "__v": 0
}
```
Criar Plano Mensal + 7 dias grátis

Obj POST
```
{
  "name": "Mensal + 7 dias Grátis",
  "items": [
    {
      "name": "Sanarflix",
      "quantity": 1,
	      "pricing_scheme": {
        "price": 3000
      }
    }
  ],
  "interval": "month",
  "interval_count": 1,
  "minimum_price": 3000,
  "trial_period_days": 7,
  "metadata": {
  	"id": "mensal-free-tier"
  }
}
```
Obj Retorno:
```
{
    "_id": "5c9837570e83d823406349d5",
    "name": "Mensal + 7 dias Grátis",
    "_idPlanMP": "plan_my759YOsvOHEQ5ZV",
    "__v": 0
}
```
Criando assinatura:
```
http://localhost:3000/api/signature
```
obj POST:
```
{
	"_idCustomer": "5c983294d9f19a1efd2c690b",
	"_idCustomerMP": "cus_EGKWjofBzUdVZLwQ",
	"_idPlan": "5c9837570e83d823406349d5",
	"_idPlanMP":"plan_my759YOsvOHEQ5ZV",
	"payment_method": "credit_card"
}
```
obj Retorno:
```
{
    "_id": "5c983bf01464dd26067b351b",
    "_idCustomer": "5c983294d9f19a1efd2c690b",
    "_idCustomerMP": "cus_EGKWjofBzUdVZLwQ",
    "_idPlan": "5c9837570e83d823406349d5",
    "_idPlanMP": "plan_my759YOsvOHEQ5ZV",
    "payment_method": "credit_card",
    "card": {
        "inUse": true,
        "_id": "5c983294d9f19a1efd2c690c",
        "number": "346051440042071",
        "cvv": "999",
        "holder_name": "JULIANA",
        "exp_month": 2,
        "exp_year": 21
    },
    "_idSignatureMP": "sub_6LB1D98hZefrX2gw",
    "__v": 0
}
```
## Caso de Pedro
Criar custumer (POST)

```
http://localhost:3000/api/customer
```

objeto POST:
```
{
	"name": "Pedro",
	"email": "pedro@pedro.com.br",
	"creditCard": [
		{
			"number" : "346051440042071",
			"cvv": "999",
			"holder_name": "PEDRO",
			"exp_month": 2,
			"exp_year": 21
		}
		]
}
```
retorno POST:
```
{
    "type": "individual",
    "_id": "5c983c6f1464dd26067b351c",
    "name": "Pedro",
    "email": "pedro@pedro.com.br",
    "creditCard": [
        {
            "inUse": true,
            "_id": "5c983c6f1464dd26067b351d",
            "number": "346051440042071",
            "cvv": "999",
            "holder_name": "PEDRO",
            "exp_month": 2,
            "exp_year": 21
        }
    ],
    "_idCustomerMP": "cus_oZYLE2xukIlvMy7R",
    "__v": 0
}
```
Criar Plano Trimestral

Obj POST
```
{
  "name": "Trimestral",
  "items": [
    {
      "name": "Sanarflix",
      "quantity": 1,
	      "pricing_scheme": {
        "price": 3000
      }
    }
  ],
  "interval": "month",
  "interval_count": 3,
  "minimum_price": 1000,
  "trial_period_days": 1,
  "metadata": {
  	"id": "trimestral"
  }
}
```
Obj Retorno:
```
{
    "_id": "5c983d591464dd26067b351e",
    "name": "Trimestral",
    "_idPlanMP": "plan_8g1XLdjTVsbAnqD0",
    "__v": 0
}
```
Criando assinatura:
```
http://localhost:3000/api/signature
```
obj POST:
```
{
	"_idCustomer": "5c983c6f1464dd26067b351c",
	"_idCustomerMP": "cus_oZYLE2xukIlvMy7R",
	"_idPlan": "5c983d591464dd26067b351e",
	"_idPlanMP":"plan_8g1XLdjTVsbAnqD0",
	"payment_method": "credit_card"
}
```
obj Retorno:
```
{
    "_id": "5c983dcc1464dd26067b351f",
    "_idCustomer": "5c983c6f1464dd26067b351c",
    "_idCustomerMP": "cus_oZYLE2xukIlvMy7R",
    "_idPlan": "5c983d591464dd26067b351e",
    "_idPlanMP": "plan_8g1XLdjTVsbAnqD0",
    "payment_method": "credit_card",
    "card": {
        "inUse": true,
        "_id": "5c983c6f1464dd26067b351d",
        "number": "346051440042071",
        "cvv": "999",
        "holder_name": "PEDRO",
        "exp_month": 2,
        "exp_year": 21
    },
    "_idSignatureMP": "sub_z5wy3xFvKT98mZgd",
    "__v": 0
}
```

## Caso de Marcos
Criar custumer (POST)

```
http://localhost:3000/api/customer
```

objeto POST:
```
{
	"name": "Marcos",
	"email": "Marcos@Marcos.com.br",
	"creditCard": [
		{
			"number" : "346051440042071",
			"cvv": "999",
			"holder_name": "Marcos",
			"exp_month": 2,
			"exp_year": 21
		}
		]
}
```
retorno POST:
```
{
    "type": "individual",
    "_id": "5c983e621464dd26067b3520",
    "name": "Marcos",
    "email": "Marcos@Marcos.com.br",
    "creditCard": [
        {
            "inUse": true,
            "_id": "5c983e621464dd26067b3521",
            "number": "346051440042071",
            "cvv": "999",
            "holder_name": "Marcos",
            "exp_month": 2,
            "exp_year": 21
        }
    ],
    "_idCustomerMP": "cus_Zpqm50Ju9UVrRDjy",
    "__v": 0
}
```

Criando assinatura:
```
http://localhost:3000/api/signature
```
obj POST:
```
{
	"_idCustomer": "5c983e621464dd26067b3520",
	"_idCustomerMP": "cus_Zpqm50Ju9UVrRDjy",
	"_idPlan": "5c983d591464dd26067b351e",
	"_idPlanMP":"plan_8g1XLdjTVsbAnqD0",
	"payment_method": "credit_card"
}
```
obj Retorno:
```
{
    "_id": "5c983ec81464dd26067b3522",
    "_idCustomer": "5c983e621464dd26067b3520",
    "_idCustomerMP": "cus_Zpqm50Ju9UVrRDjy",
    "_idPlan": "5c983d591464dd26067b351e",
    "_idPlanMP": "plan_8g1XLdjTVsbAnqD0",
    "payment_method": "credit_card",
    "card": {
        "inUse": true,
        "_id": "5c983e621464dd26067b3521",
        "number": "346051440042071",
        "cvv": "999",
        "holder_name": "Marcos",
        "exp_month": 2,
        "exp_year": 21
    },
    "_idSignatureMP": "sub_nDx23QdjU1TjlNbW",
    "__v": 0
}
```
Adicionando novo cartão de cobrança:
```
http://localhost:3000/api/customer/newCreditCard/5c983e621464dd26067b3520

```
Obj POST:

```
{
	"number":"345603520465860",
	"cvv":"111",
	"holder_name":"MARCOS",
	"exp_month":1,
	"exp_year": 23
}
```
obj retorno:
```
{
    "n": 1,
    "nModified": 1,
    "opTime": {
        "ts": "6672153427146964993",
        "t": 2
    },
    "electionId": "7fffffff0000000000000002",
    "ok": 1,
    "operationTime": "6672153427146964993",
    "$clusterTime": {
        "clusterTime": "6672153427146964993",
        "signature": {
            "hash": "CkTzigIfIqN7uG+tCO+gCHf1Ia8=",
            "keyId": "6662363040605798401"
        }
    }
}

```
Alterar cartão de cobrança
```
http://localhost:3000/api/subscriptions/changeCreditCard
```
obj POST:

```
{
	"subscription_id": "sub_nDx23QdjU1TjlNbW"
}
```
retorno:
```
{
    "id": "sub_nDx23QdjU1TjlNbW",
    "code": "2XG8F0HWE6",
    "start_at": "2019-03-26T00:00:00Z",
    "interval": "month",
    "interval_count": 3,
    "billing_type": "prepaid",
    "payment_method": "credit_card",
    "currency": "BRL",
    "installments": 1,
    "minimum_price": 1000,
    "status": "future",
    "created_at": "2019-03-25T02:36:55Z",
    "updated_at": "2019-03-25T02:36:55Z",
    "customer": {
        "id": "cus_Zpqm50Ju9UVrRDjy",
        "name": "Marcos",
        "email": "Marcos@Marcos.com.br",
        "delinquent": false,
        "created_at": "2019-03-25T02:35:13Z",
        "updated_at": "2019-03-25T02:35:13Z",
        "phones": {}
    },
    "card": {
        "id": "card_Lea9n17cEeSVNwKZ",
        "first_six_digits": "345603",
        "last_four_digits": "5860",
        "brand": "Amex",
        "holder_name": "MARCOS",
        "exp_month": 1,
        "exp_year": 2023,
        "status": "active",
        "type": "credit",
        "created_at": "2019-03-25T03:51:03Z",
        "updated_at": "2019-03-25T03:51:03Z"
    },
    "plan": {
        "id": "plan_8g1XLdjTVsbAnqD0",
        "name": "Trimestral",
        "url": "plans/plan_8g1XLdjTVsbAnqD0/editora-sanar-test/trimestral",
        "trial_period_days": 1,
        "minimum_price": 1000,
        "interval": "month",
        "interval_count": 3,
        "billing_type": "prepaid",
        "payment_methods": [
            "credit_card"
        ],
        "installments": [
            1
        ],
        "status": "active",
        "currency": "BRL",
        "created_at": "2019-03-25T02:30:49Z",
        "updated_at": "2019-03-25T02:30:49Z",
        "metadata": {
            "id": "trimestral"
        }
    },
    "items": [
        {
            "id": "si_JNExKW9SWUEaxqPO",
            "name": "Sanarflix",
            "description": "Sanarflix",
            "quantity": 1,
            "status": "active",
            "created_at": "2019-03-25T02:36:55Z",
            "updated_at": "2019-03-25T02:36:55Z",
            "pricing_scheme": {
                "price": 3000,
                "scheme_type": "unit"
            }
        }
    ]
}
```

## Caso de Luiz
Criar custumer (POST)

```
http://localhost:3000/api/customer
```

objeto POST:
```
{
	"name": "Luiz",
	"email": "LUIZ@LUIZ.com.br",
	"creditCard": [
		{
			"number" : "346051440042071",
			"cvv": "999",
			"holder_name": "LUIZ",
			"exp_month": 2,
			"exp_year": 21
		}
		]
}
```
retorno POST:
```
{
    "type": "individual",
    "_id": "5c9859459c38ef3d9a99c4ea",
    "name": "Luiz",
    "email": "LUIZ@LUIZ.com.br",
    "creditCard": [
        {
            "inUse": true,
            "_id": "5c9859459c38ef3d9a99c4eb",
            "number": "346051440042071",
            "cvv": "999",
            "holder_name": "LUIZ",
            "exp_month": 2,
            "exp_year": 21,
            "_idCardMP": "card_qARv3WoirhVYvXNB"
        }
    ],
    "_idCustomerMP": "cus_7k1xO93ahlhnWAnJ",
    "__v": 0
}
```
Criar Plano Mensal + Livro YellowBook

Obj POST
```
{
  "name": "Mensal + Livro YellowBook",
  "items": [
    {
      "name": "Sanarflix",
      "quantity": 1,
	      "pricing_scheme": {
        "price": 2450
      }
    },
    {
      "name": "Yellowbook",
      "quantity": 1,
	      "pricing_scheme": {
        "price": 13990
      }
    }
  ],
  "interval": "month",
  "interval_count": 1,
  "minimum_price": 2450,
  "trial_period_days": 1,
  "metadata": {
  	"id": "mensal-yellow-book"
  }
}
```
Obj Retorno:
```
{
    "_id": "5c985a629c38ef3d9a99c4ec",
    "name": "Mensal + Livro YellowBook",
    "_idPlanMP": "plan_Zo8q95ecqtOp97z3",
    "__v": 0
}
```
Criando assinatura:
```
http://localhost:3000/api/signature
```
obj POST:
```
{
	"_idCustomer": "5c9859459c38ef3d9a99c4ea",
	"_idCustomerMP": "cus_7k1xO93ahlhnWAnJ",
	"_idPlan": "5c985a629c38ef3d9a99c4ec",
	"_idPlanMP":"plan_Zo8q95ecqtOp97z3",
	"payment_method": "credit_card"
}
```
obj Retorno:
```
{
    "_id": "5c985af7e669673eaa4f3390",
    "_idCustomer": "5c9859459c38ef3d9a99c4ea",
    "_idCustomerMP": "cus_7k1xO93ahlhnWAnJ",
    "_idPlan": "5c985a629c38ef3d9a99c4ec",
    "_idPlanMP": "plan_Zo8q95ecqtOp97z3",
    "payment_method": "credit_card",
    "card": {
        "inUse": true,
        "_id": "5c9859459c38ef3d9a99c4eb",
        "number": "346051440042071",
        "cvv": "999",
        "holder_name": "LUIZ",
        "exp_month": 2,
        "exp_year": 21,
        "_idCardMP": "card_qARv3WoirhVYvXNB"
    },
    "_idSignatureMP": "sub_m9zPjYrqSgTd30N5",
    "__v": 0
}
```

## Caso de Ricardo (Cancelando a assinatura de Luiz)
Cancelar Assinatura (DELETE)
```
http://localhost:3000/api/signature/cancelar/sub_nDx23QdjU1TjlNbW
```





