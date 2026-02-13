// ---- Hierarchical Track Data (大赛道 → 细分赛道) ----

export interface TrackCategory {
  label: string
  children: string[]
}

export const TRACK_CATEGORIES: TrackCategory[] = [
  {
    label: "\u4EBA\u5DE5\u667A\u80FD / AI",
    children: [
      "AI \u5927\u6A21\u578B",
      "AIGC \u5185\u5BB9\u751F\u6210",
      "AI \u52A9\u624B / Agent",
      "AI \u7F16\u7A0B",
      "AI \u8BBE\u8BA1",
      "AI \u5BA2\u670D",
      "AI \u8425\u9500",
      "AI \u6559\u80B2",
      "AI \u533B\u7597",
      "AI \u91D1\u878D",
      "AI \u786C\u4EF6",
      "AI \u5B89\u9632",
      "AI \u519C\u4E1A",
      "\u8BA1\u7B97\u673A\u89C6\u89C9",
      "\u81EA\u7136\u8BED\u8A00\u5904\u7406",
      "\u8BED\u97F3\u8BC6\u522B / TTS",
      "\u63A8\u8350\u7B97\u6CD5",
      "\u6570\u636E\u6807\u6CE8 / \u8BAD\u7EC3",
    ],
  },
  {
    label: "\u7535\u5B50\u5546\u52A1",
    children: [
      "\u793E\u4EA4\u7535\u5546",
      "\u76F4\u64AD\u7535\u5546",
      "\u8DE8\u5883\u7535\u5546",
      "\u793E\u533A\u56E2\u8D2D",
      "\u4E8C\u624B / \u95F2\u7F6E\u4EA4\u6613",
      "\u751F\u9C9C\u7535\u5546",
      "\u65B0\u96F6\u552E",
      "DTC \u54C1\u724C",
      "\u4F9B\u5E94\u94FE\u7535\u5546",
      "B2B \u7535\u5546",
      "\u5185\u5BB9\u7535\u5546",
      "\u4F1A\u5458\u5236\u7535\u5546",
      "\u62FC\u56E2 / \u7279\u5356",
      "\u65E0\u4EBA\u96F6\u552E",
    ],
  },
  {
    label: "\u4F01\u4E1A\u670D\u52A1 / SaaS",
    children: [
      "CRM \u5BA2\u6237\u7BA1\u7406",
      "ERP \u4F01\u4E1A\u8D44\u6E90\u89C4\u5212",
      "HRM \u4EBA\u529B\u8D44\u6E90",
      "\u534F\u540C\u529E\u516C",
      "\u9879\u76EE\u7BA1\u7406",
      "\u8D22\u7A0E\u7BA1\u7406",
      "\u6CD5\u5F8B\u79D1\u6280 (LegalTech)",
      "\u7535\u5B50\u7B7E\u7EA6",
      "\u6570\u636E\u5206\u6790 / BI",
      "\u4F4E\u4EE3\u7801 / \u65E0\u4EE3\u7801",
      "\u7F51\u7EDC\u5B89\u5168",
      "\u4E91\u8BA1\u7B97 / \u670D\u52A1\u5668",
      "DevOps / \u5F00\u53D1\u5DE5\u5177",
      "API \u7BA1\u7406",
    ],
  },
  {
    label: "\u6559\u80B2\u57F9\u8BAD",
    children: [
      "K12 \u5728\u7EBF\u6559\u80B2",
      "\u804C\u4E1A\u6559\u80B2",
      "\u6210\u4EBA\u7EE7\u7EED\u6559\u80B2",
      "\u7559\u5B66 / \u56FD\u9645\u6559\u80B2",
      "\u8BED\u8A00\u5B66\u4E60",
      "STEM / \u7F16\u7A0B\u6559\u80B2",
      "\u7D20\u8D28\u6559\u80B2",
      "\u65E9\u6559 / \u5B66\u524D\u6559\u80B2",
      "\u77E5\u8BC6\u4ED8\u8D39",
      "\u4F01\u4E1A\u5185\u8BAD",
      "\u8003\u8BD5 / \u8BA4\u8BC1\u57F9\u8BAD",
      "\u827A\u672F / \u97F3\u4E50\u6559\u80B2",
    ],
  },
  {
    label: "\u533B\u7597\u5065\u5EB7",
    children: [
      "\u5728\u7EBF\u95EE\u8BCA",
      "\u6570\u5B57\u7597\u6CD5",
      "\u533B\u7597\u5F71\u50CF AI",
      "\u836F\u54C1\u7535\u5546",
      "\u57FA\u56E0\u68C0\u6D4B",
      "\u5FC3\u7406\u5065\u5EB7",
      "\u5065\u5EB7\u7BA1\u7406",
      "\u533B\u7F8E / \u53E3\u8154",
      "\u4F53\u68C0 / \u4FDD\u9669",
      "\u5EB7\u590D / \u62A4\u7406",
      "\u4E2D\u533B / \u517B\u751F",
      "\u533B\u7597\u5668\u68B0",
      "\u751F\u7269\u5236\u836F",
    ],
  },
  {
    label: "\u91D1\u878D\u79D1\u6280",
    children: [
      "\u79FB\u52A8\u652F\u4ED8",
      "\u6D88\u8D39\u4FE1\u8D37",
      "\u4FDD\u9669\u79D1\u6280",
      "\u8D22\u5BCC\u7BA1\u7406",
      "\u667A\u80FD\u6295\u987E",
      "\u533A\u5757\u94FE / Web3",
      "\u4F9B\u5E94\u94FE\u91D1\u878D",
      "\u5F81\u4FE1 / \u98CE\u63A7",
      "\u6570\u5B57\u94F6\u884C",
      "\u8D26\u52A1\u81EA\u52A8\u5316",
      "\u8DE8\u5883\u652F\u4ED8",
    ],
  },
  {
    label: "\u6587\u5316\u5A31\u4E50",
    children: [
      "\u77ED\u89C6\u9891\u5E73\u53F0",
      "\u957F\u89C6\u9891 / \u6D41\u5A92\u4F53",
      "\u6E38\u620F",
      "\u97F3\u4E50",
      "\u6F2B\u753B / \u52A8\u6F2B",
      "\u7F51\u7EDC\u6587\u5B66",
      "\u64AD\u5BA2",
      "\u865A\u62DF\u5076\u50CF / \u6570\u5B57\u4EBA",
      "\u7535\u5F71 / \u5F71\u89C6\u5236\u4F5C",
      "\u7535\u7AF6",
      "NFT / \u6570\u5B57\u85CF\u54C1",
      "MCN / \u7F51\u7EA2\u7ECF\u6D4E",
    ],
  },
  {
    label: "\u793E\u4EA4\u901A\u8BAF",
    children: [
      "\u5373\u65F6\u901A\u8BAF",
      "\u964C\u751F\u4EBA\u793E\u4EA4",
      "\u5174\u8DA3\u793E\u533A",
      "\u5A5A\u604B / \u76F8\u4EB2",
      "\u804C\u573A\u793E\u4EA4",
      "\u5B66\u751F\u793E\u533A",
      "\u5BA0\u7269\u793E\u4EA4",
      "\u89C6\u9891\u793E\u4EA4",
      "\u533F\u540D\u793E\u4EA4",
      "\u5708\u5B50 / \u4F1A\u5458\u793E\u533A",
    ],
  },
  {
    label: "\u672C\u5730\u751F\u6D3B / O2O",
    children: [
      "\u9910\u996E\u5916\u5356",
      "\u751F\u6D3B\u670D\u52A1",
      "\u5BB6\u653F / \u4FDD\u6D01",
      "\u7F8E\u53D1 / \u7F8E\u5BB9",
      "\u623F\u4EA7 / \u79DF\u623F",
      "\u5BB6\u88C5 / \u5EFA\u6750",
      "\u5A5A\u5E86 / \u6444\u5F71",
      "\u4E8C\u624B\u8F66",
      "\u6C7D\u8F66\u540E\u5E02\u573A",
      "\u5065\u8EAB / \u745C\u4F3D",
      "\u5BA0\u7269\u670D\u52A1",
      "\u5F00\u9501 / \u7EF4\u4FEE",
    ],
  },
  {
    label: "\u65C5\u6E38\u51FA\u884C",
    children: [
      "OTA \u5728\u7EBF\u65C5\u6E38",
      "\u6C11\u5BBF / \u9152\u5E97",
      "\u5BFC\u6E38 / \u5730\u63A5",
      "\u623F\u8F66\u65C5\u884C",
      "\u6237\u5916\u63A2\u9669",
      "\u51FA\u5883\u6E38",
      "\u4EA4\u901A\u51FA\u884C",
      "\u5171\u4EAB\u51FA\u884C",
      "\u5F52\u56FD / \u5546\u65C5",
      "\u65C5\u6E38\u793E\u4EA4",
    ],
  },
  {
    label: "\u7269\u6D41\u4F9B\u5E94\u94FE",
    children: [
      "\u5373\u65F6\u914D\u9001",
      "\u5FEB\u9012 / \u5FEB\u8FD0",
      "\u51B7\u94FE\u7269\u6D41",
      "\u4ED3\u50A8\u7BA1\u7406",
      "\u8DE8\u5883\u7269\u6D41",
      "\u667A\u80FD\u5206\u62E3",
      "\u65E0\u4EBA\u914D\u9001",
      "\u8D27\u8FD0\u5339\u914D",
      "\u4F9B\u5E94\u94FE\u91D1\u878D",
    ],
  },
  {
    label: "\u519C\u4E1A\u79D1\u6280",
    children: [
      "\u667A\u6167\u519C\u4E1A",
      "\u519C\u4EA7\u54C1\u7535\u5546",
      "\u519C\u4E1A\u65E0\u4EBA\u673A",
      "\u519C\u4E1A IoT",
      "\u519C\u4E1A\u4F9B\u5E94\u94FE",
      "\u751F\u7269\u80B2\u79CD",
      "\u690D\u7269\u5DE5\u5382",
      "\u6E14\u4E1A\u79D1\u6280",
    ],
  },
  {
    label: "\u65B0\u80FD\u6E90 / \u73AF\u4FDD",
    children: [
      "\u65B0\u80FD\u6E90\u6C7D\u8F66",
      "\u5145\u6362\u7535\u670D\u52A1",
      "\u5149\u4F0F / \u592A\u9633\u80FD",
      "\u50A8\u80FD",
      "\u78B3\u4EA4\u6613 / \u78B3\u4E2D\u548C",
      "\u5E9F\u54C1\u56DE\u6536",
      "\u6C34\u5904\u7406 / \u73AF\u4FDD",
      "\u667A\u80FD\u7535\u7F51",
    ],
  },
  {
    label: "\u623F\u5730\u4EA7 / \u5EFA\u7B51",
    children: [
      "\u667A\u6167\u5EFA\u7B51 (BIM)",
      "\u88C5\u914D\u5F0F\u5EFA\u7B51",
      "\u7269\u4E1A\u7BA1\u7406",
      "\u957F\u79DF\u516C\u5BD3",
      "\u5171\u4EAB\u529E\u516C",
      "\u667A\u6167\u793E\u533A",
      "\u623F\u4EA7\u4EA4\u6613\u5E73\u53F0",
    ],
  },
  {
    label: "\u5236\u9020\u4E1A / \u786C\u79D1\u6280",
    children: [
      "\u673A\u5668\u4EBA",
      "\u65E0\u4EBA\u673A",
      "3D \u6253\u5370",
      "\u534A\u5BFC\u4F53 / \u82AF\u7247",
      "IoT \u7269\u8054\u7F51",
      "\u667A\u80FD\u5BB6\u5C45",
      "\u53EF\u7A7F\u6234\u8BBE\u5907",
      "AR / VR",
      "\u5DE5\u4E1A\u8F6F\u4EF6",
      "\u6570\u5B57\u5B6A\u751F",
      "\u65B0\u6750\u6599",
    ],
  },
  {
    label: "\u94F6\u53D1\u7ECF\u6D4E / \u517B\u8001",
    children: [
      "\u667A\u6167\u517B\u8001",
      "\u8001\u5E74\u793E\u4EA4",
      "\u8001\u5E74\u6559\u80B2",
      "\u8001\u5E74\u65C5\u6E38",
      "\u5065\u5EB7\u76D1\u6D4B",
      "\u62A4\u7406\u670D\u52A1",
      "\u9002\u8001\u5316\u6539\u9020",
    ],
  },
  {
    label: "\u5BA0\u7269\u7ECF\u6D4E",
    children: [
      "\u5BA0\u7269\u98DF\u54C1",
      "\u5BA0\u7269\u533B\u7597",
      "\u5BA0\u7269\u793E\u4EA4",
      "\u5BA0\u7269\u5BC4\u517B",
      "\u5BA0\u7269\u7528\u54C1",
      "\u5BA0\u7269\u4FDD\u9669",
      "\u667A\u80FD\u5BA0\u7269\u786C\u4EF6",
    ],
  },
  {
    label: "\u98DF\u54C1\u996E\u6599",
    children: [
      "\u65B0\u8336\u996E",
      "\u7CBE\u917F\u5564\u9152 / \u9152\u996E",
      "\u4EE3\u9910 / \u529F\u80FD\u98DF\u54C1",
      "\u9884\u5236\u83DC",
      "\u96F6\u98DF",
      "\u690D\u7269\u57FA\u98DF\u54C1",
      "\u4F9B\u5E94\u94FE / \u98DF\u54C1\u5B89\u5168",
    ],
  },
]

// Flatten all sub-tracks for randomization
export const ALL_TRACKS: string[] = TRACK_CATEGORIES.flatMap((c) => c.children)

// ---- Role Data ----
export interface RoleCategory {
  label: string
  children: string[]
}

export const ROLE_CATEGORIES: RoleCategory[] = [
  {
    label: "\u5B66\u751F / \u6821\u56ED",
    children: [
      "\u5728\u6821\u5927\u5B66\u751F",
      "\u7814\u7A76\u751F / \u535A\u58EB\u751F",
      "\u6D77\u5F52\u7559\u5B66\u751F",
      "\u5E94\u5C4A\u6BD5\u4E1A\u751F",
    ],
  },
  {
    label: "\u804C\u573A\u4EBA\u58EB",
    children: [
      "\u4E92\u8054\u7F51\u4ECE\u4E1A\u8005",
      "\u4F20\u7EDF\u884C\u4E1A\u4ECE\u4E1A\u8005",
      "\u4F01\u4E1A\u9AD8\u7BA1 / VP",
      "\u4E2D\u5C42\u7BA1\u7406\u8005",
      "\u4EA7\u54C1\u7ECF\u7406",
      "\u5DE5\u7A0B\u5E08 / \u6280\u672F\u5F00\u53D1\u8005",
      "\u8BBE\u8BA1\u5E08",
      "\u8425\u9500 / \u8FD0\u8425\u4EBA\u5458",
      "\u9500\u552E\u4EBA\u5458",
      "\u6570\u636E\u5206\u6790\u5E08",
      "\u54A8\u8BE2\u987E\u95EE",
    ],
  },
  {
    label: "\u521B\u4E1A\u8005",
    children: [
      "\u8FDE\u7EED\u521B\u4E1A\u8005",
      "\u9996\u6B21\u521B\u4E1A\u8005",
      "\u526F\u4E1A\u521B\u4E1A\u8005",
      "\u6280\u672F\u578B\u521B\u4E1A\u8005",
      "\u8D44\u6E90\u578B\u521B\u4E1A\u8005",
    ],
  },
  {
    label: "\u81EA\u7531\u804C\u4E1A / \u521B\u4F5C\u8005",
    children: [
      "\u81EA\u7531\u804C\u4E1A\u8005",
      "\u81EA\u5A92\u4F53 / \u535A\u4E3B",
      "\u77ED\u89C6\u9891\u521B\u4F5C\u8005",
      "\u5199\u4F5C\u8005 / \u4F5C\u5BB6",
      "\u72EC\u7ACB\u5F00\u53D1\u8005",
      "\u6444\u5F71\u5E08 / \u89C6\u9891\u5236\u4F5C\u4EBA",
      "\u97F3\u4E50\u4EBA / \u827A\u672F\u5BB6",
    ],
  },
  {
    label: "\u5BB6\u5EAD / \u751F\u6D3B",
    children: [
      "\u5168\u804C\u5988\u5988 / \u5168\u804C\u7238\u7238",
      "\u5BB6\u5EAD\u4E3B\u5987 / \u4E3B\u592B",
      "\u9000\u4F11\u4EBA\u58EB",
      "\u9000\u4F11\u5DE5\u7A0B\u5E08",
    ],
  },
  {
    label: "\u6295\u8D44 / \u8D22\u52A1",
    children: [
      "\u5929\u4F7F\u6295\u8D44\u4EBA",
      "VC \u6295\u8D44\u4EBA",
      "\u8D22\u52A1\u987E\u95EE",
      "\u57FA\u91D1\u7ECF\u7406",
    ],
  },
  {
    label: "\u7279\u5B9A\u80CC\u666F",
    children: [
      "\u6D77\u5916\u534E\u4EBA",
      "\u5C0F\u9547\u9752\u5E74",
      "\u4E8C\u7EBF\u57CE\u5E02\u5C45\u6C11",
      "\u4E00\u7EBF\u57CE\u5E02\u767D\u9886",
      "\u4F53\u5236\u5185 / \u516C\u52A1\u5458",
      "\u6559\u5E08 / \u6559\u80B2\u5DE5\u4F5C\u8005",
      "\u533B\u751F / \u62A4\u58EB",
      "\u5F8B\u5E08",
      "\u4F1A\u8BA1\u5E08",
    ],
  },
]

export const ALL_ROLES: string[] = ROLE_CATEGORIES.flatMap((c) => c.children)

// ---- Asset Data ----
export interface AssetCategory {
  label: string
  children: string[]
}

export const ASSET_CATEGORIES: AssetCategory[] = [
  {
    label: "\u8D44\u91D1",
    children: [
      "0 \u542F\u52A8\u8D44\u91D1",
      "1-5 \u4E07\u542F\u52A8\u8D44\u91D1",
      "5-10 \u4E07\u542F\u52A8\u8D44\u91D1",
      "10-50 \u4E07\u542F\u52A8\u8D44\u91D1",
      "50-100 \u4E07\u542F\u52A8\u8D44\u91D1",
      "100 \u4E07\u4EE5\u4E0A\u542F\u52A8\u8D44\u91D1",
      "\u5DF2\u83B7\u5929\u4F7F\u8F6E\u878D\u8D44",
      "\u5DF2\u83B7 A \u8F6E\u878D\u8D44",
    ],
  },
  {
    label: "\u6280\u672F\u80FD\u529B",
    children: [
      "\u6280\u672F\u56E2\u961F",
      "\u5168\u6808\u5F00\u53D1\u80FD\u529B",
      "\u524D\u7AEF\u5F00\u53D1\u80FD\u529B",
      "\u540E\u7AEF\u5F00\u53D1\u80FD\u529B",
      "AI / \u7B97\u6CD5\u80FD\u529B",
      "\u6570\u636E\u5206\u6790\u80FD\u529B",
      "\u786C\u4EF6\u7814\u53D1\u80FD\u529B",
      "\u4E13\u5229 / \u6838\u5FC3\u6280\u672F",
    ],
  },
  {
    label: "\u6D41\u91CF / \u7528\u6237",
    children: [
      "\u793E\u7FA4\u6D41\u91CF (\u5FAE\u4FE1\u7FA4 / QQ\u7FA4)",
      "\u516C\u4F17\u53F7 / \u5C0F\u7A0B\u5E8F\u7528\u6237",
      "\u6296\u97F3 / \u5FEB\u624B\u7C89\u4E1D",
      "\u5C0F\u7EA2\u4E66\u7C89\u4E1D",
      "B\u7AD9 / \u77E5\u4E4E\u7C89\u4E1D",
      "\u5FAE\u535A\u7C89\u4E1D",
      "\u6DD8\u5B9D / \u4EAC\u4E1C\u5E97\u94FA",
      "\u72EC\u7ACB\u7AD9\u6D41\u91CF",
      "\u6D77\u5916\u793E\u4EA4\u5A92\u4F53\u7C89\u4E1D",
      "\u7EBF\u4E0B\u5BA2\u6E90",
    ],
  },
  {
    label: "\u884C\u4E1A\u8D44\u6E90",
    children: [
      "\u884C\u4E1A\u4EBA\u8109\u5173\u7CFB",
      "\u4F9B\u5E94\u94FE / \u5DE5\u5382\u8D44\u6E90",
      "\u6E20\u9053\u8D44\u6E90",
      "\u653F\u5E9C / \u6821\u56ED\u8D44\u6E90",
      "\u533B\u9662 / \u533B\u7597\u8D44\u6E90",
      "\u5A92\u4F53 / KOL \u8D44\u6E90",
      "\u6295\u8D44\u4EBA\u8D44\u6E90",
      "\u6D77\u5916\u8D44\u6E90",
    ],
  },
  {
    label: "\u5185\u5BB9 / \u54C1\u724C",
    children: [
      "\u4E2A\u4EBA\u54C1\u724C / IP",
      "\u5185\u5BB9\u521B\u4F5C\u80FD\u529B",
      "\u6210\u719F\u54C1\u724C",
      "\u7EBF\u4E0B\u95E8\u5E97",
    ],
  },
  {
    label: "\u65F6\u95F4 / \u7ECF\u9A8C",
    children: [
      "\u5145\u88D5\u65F6\u95F4 (\u5168\u804C\u6295\u5165)",
      "\u4E1A\u4F59\u65F6\u95F4 (\u526F\u4E1A)",
      "\u884C\u4E1A\u7ECF\u9A8C (5\u5E74+)",
      "\u884C\u4E1A\u7ECF\u9A8C (10\u5E74+)",
      "\u521B\u4E1A\u7ECF\u9A8C",
      "\u6D77\u5916\u5DE5\u4F5C / \u751F\u6D3B\u7ECF\u9A8C",
    ],
  },
  {
    label: "\u5176\u4ED6",
    children: [
      "\u65E0\u4EFB\u4F55\u8D44\u6E90",
      "\u53EA\u6709\u4E00\u4E2A\u60F3\u6CD5",
      "\u5F3A\u6267\u884C\u529B",
      "\u56E2\u961F\u534F\u4F5C\u80FD\u529B",
    ],
  },
]

export const ALL_ASSETS: string[] = ASSET_CATEGORIES.flatMap((c) => c.children)
