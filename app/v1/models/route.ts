import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const models = {
    object: "list",
    data: [
      {
        id: "text-search-babbage-doc-001",
        object: "model",
        created: 1651172509,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-s9n5HnzbtVn7kNc5TIZWiCFS",
            object: "model_permission",
            created: 1695933794,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-search-babbage-doc-001",
        parent: null
      },
      {
        id: "gpt-3.5-turbo-16k-0613",
        object: "model",
        created: 1685474247,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-6TvrqdxTZPTKF0DrBbCYP3sh",
            object: "model_permission",
            created: 1697854292,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "gpt-3.5-turbo-16k-0613",
        parent: null
      },
      {
        id: "curie-search-query",
        object: "model",
        created: 1651172509,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-8aqdyZaKtD3MD831mGbqh1MD",
            object: "model_permission",
            created: 1695149182,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "curie-search-query",
        parent: null
      },
      {
        id: "gpt-3.5-turbo-16k",
        object: "model",
        created: 1683758102,
        owned_by: "openai-internal",
        permission: [
          {
            id: "modelperm-UTqphsmnPe8SNK52msfOjBhP",
            object: "model_permission",
            created: 1697854304,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "gpt-3.5-turbo-16k",
        parent: null
      },
      {
        id: "text-search-babbage-query-001",
        object: "model",
        created: 1651172509,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-hXsRH2IK0hXmWxmLRiNTp70t",
            object: "model_permission",
            created: 1695933813,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-search-babbage-query-001",
        parent: null
      },
      {
        id: "babbage",
        object: "model",
        created: 1649358449,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-h574xGeqWyBeFDDKaoVTC4CO",
            object: "model_permission",
            created: 1692394129,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "babbage",
        parent: null
      },
      {
        id: "babbage-search-query",
        object: "model",
        created: 1651172509,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-1zMLcaRlTvYAdpmvvixnTWlF",
            object: "model_permission",
            created: 1695933835,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "babbage-search-query",
        parent: null
      },
      {
        id: "text-babbage-001",
        object: "model",
        created: 1649364043,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-YABzYWjC1kS6M2BnI6Fr9vuS",
            object: "model_permission",
            created: 1690913878,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-babbage-001",
        parent: null
      },
      {
        id: "whisper-1",
        object: "model",
        created: 1677532384,
        owned_by: "openai-internal",
        permission: [
          {
            id: "modelperm-U3ME91kLaXQ3r9Vzm9l73O7P",
            object: "model_permission",
            created: 1698087532,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "whisper-1",
        parent: null
      },
      {
        id: "text-similarity-davinci-001",
        object: "model",
        created: 1651172505,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-C6TT4mQR3bJQEzEuiZlhKM5u",
            object: "model_permission",
            created: 1695143463,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-similarity-davinci-001",
        parent: null
      },
      {
        id: "davinci-similarity",
        object: "model",
        created: 1651172509,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-OtRWxI0nRtN9q8mHI3OOk0GT",
            object: "model_permission",
            created: 1695143471,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "davinci-similarity",
        parent: null
      },
      {
        id: "code-davinci-edit-001",
        object: "model",
        created: 1649880484,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-T8Ie7SvlPyvtsDvPlfC8DftZ",
            object: "model_permission",
            created: 1690915089,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "code-davinci-edit-001",
        parent: null
      },
      {
        id: "curie-similarity",
        object: "model",
        created: 1651172510,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-9PfIlYDKOt24EV6fnCiunZGA",
            object: "model_permission",
            created: 1695149271,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "curie-similarity",
        parent: null
      },
      {
        id: "babbage-search-document",
        object: "model",
        created: 1651172510,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-qJ0Iu5XcwrdsmSOn9ewphBNF",
            object: "model_permission",
            created: 1695933877,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "babbage-search-document",
        parent: null
      },
      {
        id: "curie-instruct-beta",
        object: "model",
        created: 1649364042,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-rTxpdy2DwwUp38frYQFsj5OC",
            object: "model_permission",
            created: 1694819118,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "curie-instruct-beta",
        parent: null
      },
      {
        id: "text-search-ada-doc-001",
        object: "model",
        created: 1651172507,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-tdL3cX2rMgQuyfQwqNGcQOp3",
            object: "model_permission",
            created: 1695166106,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-search-ada-doc-001",
        parent: null
      },
      {
        id: "davinci-instruct-beta",
        object: "model",
        created: 1649364042,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-SKEW42qz05X43sqLXFwhbAox",
            object: "model_permission",
            created: 1695166658,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "davinci-instruct-beta",
        parent: null
      },
      {
        id: "gpt-3.5-turbo-0613",
        object: "model",
        created: 1686587434,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-AsSnPfAbh2Ng4NTZnMltMLXP",
            object: "model_permission",
            created: 1698248795,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "gpt-3.5-turbo-0613",
        parent: null
      },
      {
        id: "text-similarity-babbage-001",
        object: "model",
        created: 1651172505,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-yNsfFUtfAoDhJHRofgD2Kjgd",
            object: "model_permission",
            created: 1695933939,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-similarity-babbage-001",
        parent: null
      },
      {
        id: "text-search-davinci-doc-001",
        object: "model",
        created: 1651172505,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-I0hY9ySAeJrE3qBF47roClh9",
            object: "model_permission",
            created: 1695143675,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-search-davinci-doc-001",
        parent: null
      },
      {
        id: "babbage-similarity",
        object: "model",
        created: 1651172505,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-8Inp4vh9P5Mh0llHmSX8Va3b",
            object: "model_permission",
            created: 1695933959,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "babbage-similarity",
        parent: null
      },
      {
        id: "text-embedding-ada-002",
        object: "model",
        created: 1671217299,
        owned_by: "openai-internal",
        permission: [
          {
            id: "modelperm-FNUaYBtQjesvQWilxRkyxTO0",
            object: "model_permission",
            created: 1698368554,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-embedding-ada-002",
        parent: null
      },
      {
        id: "davinci-search-query",
        object: "model",
        created: 1651172505,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-ZNL7KVorrZk5pvj7v3cG3lUz",
            object: "model_permission",
            created: 1695143683,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "davinci-search-query",
        parent: null
      },
      {
        id: "text-similarity-curie-001",
        object: "model",
        created: 1651172507,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-J2U414W9ZcjxYqf13tZdvwI5",
            object: "model_permission",
            created: 1695149279,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-similarity-curie-001",
        parent: null
      },
      {
        id: "text-davinci-001",
        object: "model",
        created: 1649364042,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-bwpDudS41UaZskP1jKfAHKMG",
            object: "model_permission",
            created: 1694819202,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-davinci-001",
        parent: null
      },
      {
        id: "text-search-davinci-query-001",
        object: "model",
        created: 1651172505,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-lEI8RY9UBNhXYJRKub8U4Sc1",
            object: "model_permission",
            created: 1695143690,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-search-davinci-query-001",
        parent: null
      },
      {
        id: "ada-search-document",
        object: "model",
        created: 1651172507,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-CSgBXBOV02tB05EbOK36apFu",
            object: "model_permission",
            created: 1695166132,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "ada-search-document",
        parent: null
      },
      {
        id: "ada-code-search-code",
        object: "model",
        created: 1651172505,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-NFpO3yF5OZ9bfwls2MSUn5cR",
            object: "model_permission",
            created: 1695166330,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "ada-code-search-code",
        parent: null
      },
      {
        id: "babbage-002",
        object: "model",
        created: 1692634615,
        owned_by: "system",
        permission: [
          {
            id: "modelperm-tC8uL3ohDEVSzUvcgZCv33gV",
            object: "model_permission",
            created: 1692720928,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "babbage-002",
        parent: null
      },
      {
        id: "davinci-002",
        object: "model",
        created: 1692634301,
        owned_by: "system",
        permission: [
          {
            id: "modelperm-9a6yBfznsbObxHVWBWRJctsx",
            object: "model_permission",
            created: 1694818100,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "davinci-002",
        parent: null
      },
      {
        id: "davinci-search-document",
        object: "model",
        created: 1651172509,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-Bbb0MBYeWROhvx9NkaDbZg3R",
            object: "model_permission",
            created: 1695143700,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "davinci-search-document",
        parent: null
      },
      {
        id: "curie-search-document",
        object: "model",
        created: 1651172508,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-xkoHDxWoBlLQj4HM4iVwWj9C",
            object: "model_permission",
            created: 1695149161,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "curie-search-document",
        parent: null
      },
      {
        id: "babbage-code-search-code",
        object: "model",
        created: 1651172509,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-5Dv3knU1yoRtpY5TFzSHySiM",
            object: "model_permission",
            created: 1695934020,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "babbage-code-search-code",
        parent: null
      },
      {
        id: "text-search-ada-query-001",
        object: "model",
        created: 1651172505,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-2XH9mphBxBD5uKyXKn8o77sE",
            object: "model_permission",
            created: 1695166152,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-search-ada-query-001",
        parent: null
      },
      {
        id: "code-search-ada-text-001",
        object: "model",
        created: 1651172507,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-MQOFciXDRywliXymhKJT5rUy",
            object: "model_permission",
            created: 1695166346,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "code-search-ada-text-001",
        parent: null
      },
      {
        id: "babbage-code-search-text",
        object: "model",
        created: 1651172509,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-DE4WMTkago3EHJ0n1p2urLkw",
            object: "model_permission",
            created: 1695934039,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "babbage-code-search-text",
        parent: null
      },
      {
        id: "code-search-babbage-code-001",
        object: "model",
        created: 1651172507,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-xuS8vuaSaa5jIQSmyP0S35Qd",
            object: "model_permission",
            created: 1695934060,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "code-search-babbage-code-001",
        parent: null
      },
      {
        id: "ada-search-query",
        object: "model",
        created: 1651172505,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-kSLKiCrDbosTMvZnIt5wuEqE",
            object: "model_permission",
            created: 1695166172,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "ada-search-query",
        parent: null
      },
      {
        id: "ada-code-search-text",
        object: "model",
        created: 1651172510,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-Ya8bDcPgbFbqFR0K44jdPN64",
            object: "model_permission",
            created: 1695166368,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "ada-code-search-text",
        parent: null
      },
      {
        id: "text-search-curie-query-001",
        object: "model",
        created: 1651172509,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-7Y7YYZkPezf96wy8j5bphjjg",
            object: "model_permission",
            created: 1695149169,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-search-curie-query-001",
        parent: null
      },
      {
        id: "text-davinci-002",
        object: "model",
        created: 1649880484,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-eKMXF4rV1slbvrpgmDbTm3wD",
            object: "model_permission",
            created: 1695082227,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-davinci-002",
        parent: null
      },
      {
        id: "text-davinci-edit-001",
        object: "model",
        created: 1649809179,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-bwEWUtGiBcdX0p1D1ayafH8w",
            object: "model_permission",
            created: 1690915020,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-davinci-edit-001",
        parent: null
      },
      {
        id: "code-search-babbage-text-001",
        object: "model",
        created: 1651172507,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-JkzgCs0oPZaC1uCfO0n0ulYX",
            object: "model_permission",
            created: 1695934089,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "code-search-babbage-text-001",
        parent: null
      },
      {
        id: "gpt-3.5-turbo",
        object: "model",
        created: 1677610602,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-8alC96uUa8JzYD8wwZzqiJDY",
            object: "model_permission",
            created: 1698275221,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "gpt-3.5-turbo",
        parent: null
      },
      {
        id: "gpt-3.5-turbo-instruct-0914",
        object: "model",
        created: 1694122472,
        owned_by: "system",
        permission: [
          {
            id: "modelperm-kMX0MSKsmmMHNQaGtK0ID5Nr",
            object: "model_permission",
            created: 1697244057,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "gpt-3.5-turbo-instruct-0914",
        parent: null
      },
      {
        id: "ada",
        object: "model",
        created: 1649357491,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-0JnkYlxDvw3kMS1mht3cmQKR",
            object: "model_permission",
            created: 1695934146,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "ada",
        parent: null
      },
      {
        id: "text-ada-001",
        object: "model",
        created: 1649364042,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-jRuB7xBCdj159SqaDmpPgeWO",
            object: "model_permission",
            created: 1690915029,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-ada-001",
        parent: null
      },
      {
        id: "ada-similarity",
        object: "model",
        created: 1651172507,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-z4NZ5sCV2GsxBeNqzcNVhEvH",
            object: "model_permission",
            created: 1695166231,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "ada-similarity",
        parent: null
      },
      {
        id: "code-search-ada-code-001",
        object: "model",
        created: 1651172507,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-9k7jVGlzTgB52nza3Po7ENUZ",
            object: "model_permission",
            created: 1695166414,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "code-search-ada-code-001",
        parent: null
      },
      {
        id: "text-similarity-ada-001",
        object: "model",
        created: 1651172505,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-2l92GeLtllKOhDdWb6RzzfEN",
            object: "model_permission",
            created: 1695166256,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-similarity-ada-001",
        parent: null
      },
      {
        id: "gpt-3.5-turbo-0301",
        object: "model",
        created: 1677649963,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-I4IcSJFYZl2fIK0DPSBkgK3d",
            object: "model_permission",
            created: 1691712139,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "gpt-3.5-turbo-0301",
        parent: null
      },
      {
        id: "gpt-3.5-turbo-instruct",
        object: "model",
        created: 1692901427,
        owned_by: "system",
        permission: [
          {
            id: "modelperm-UK4BVstQKYTKaTj3zbCsKCGx",
            object: "model_permission",
            created: 1697244075,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "gpt-3.5-turbo-instruct",
        parent: null
      },
      {
        id: "text-search-curie-doc-001",
        object: "model",
        created: 1651172509,
        owned_by: "openai-dev",
        permission: [
          {
            id: "modelperm-gMoCj5Vfel451hGbAp0kfKMH",
            object: "model_permission",
            created: 1695149177,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: true,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-search-curie-doc-001",
        parent: null
      },
      {
        id: "text-davinci-003",
        object: "model",
        created: 1669599635,
        owned_by: "openai-internal",
        permission: [
          {
            id: "modelperm-OLYlW6I3e7VURS85ytehLxKj",
            object: "model_permission",
            created: 1696613334,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-davinci-003",
        parent: null
      },
      {
        id: "text-curie-001",
        object: "model",
        created: 1649364043,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-3D7myCVeMXS00PJdPESttrwj",
            object: "model_permission",
            created: 1695936121,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "text-curie-001",
        parent: null
      },
      {
        id: "curie",
        object: "model",
        created: 1649359874,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-FwPnxb7Y7YHn9eMwTNgQyiJ4",
            object: "model_permission",
            created: 1695936177,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "curie",
        parent: null
      },
      {
        id: "davinci",
        object: "model",
        created: 1649359874,
        owned_by: "openai",
        permission: [
          {
            id: "modelperm-y6gcUIF10Txa9oYyOy86r6wq",
            object: "model_permission",
            created: 1698359395,
            allow_create_engine: false,
            allow_sampling: true,
            allow_logprobs: true,
            allow_search_indices: false,
            allow_view: true,
            allow_fine_tuning: false,
            organization: "*",
            group: null,
            is_blocking: false
          }
        ],
        root: "davinci",
        parent: null
      }
    ]
  };
  return NextResponse.json(models, {status: 200})
}