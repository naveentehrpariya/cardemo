import React, { useContext, useEffect, useRef, useState } from 'react'
import { getImages } from '../Common/const'
import { VehicleContext } from '../../context/VehicleContext';
import { useRouter } from 'next/router';
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import Slider from "react-slick";
import { Field, Form, Formik } from 'formik';
import ValidationError from '../Errors/ValidationError';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

const Vdp = () => {
    const vehicleData = {
        "stockno": "P272648",
        "vin": "ZFF96NMA8N0272648",
        "dealership": "wholesale-262",
        "vehicle_name": "2022 Ferrari SF90 Spider ROSSO F1 2007 - CARBON BUCKETS",
        "year": 2022,
        "make": "Ferrari",
        "model": "SF90 Spider",
        "trim": "ROSSO F1 2007 - CARBON BUCKETS",
        "body_style": "Coupe",
        "exterior_color": "ROSSO F1 2007",
        "interior_color": "Rosso Ferrari",
        "mileage": 3996,
        "tol": 83,
        "inventory_date": "2025-08-20",
        "utc_inventory_date": "1755648000",
        "image_urls": "\"https://inventory.dealersocket.com/api/photo/n--tGRZA/1600x0/1761674808/u/ecl/fVFo/pCcc/roM8/li54/DPQF/iA.jpg\",\"https://inventory.dealersocket.com/api/photo/2-X7xk06/1600x0/1761674809/u/ecl/WNch/vmJ0/GEW5/yRzS/aJma/4w.jpg\",\"https://inventory.dealersocket.com/api/photo/vlsVC-Eo/1600x0/1761674812/u/ecl/ZOZJ/5IAx/jv27/chZj/50V3/ng.jpg\",\"https://inventory.dealersocket.com/api/photo/P7vr5HN1/1600x0/1761674815/u/ecl/Cvqr/Vfuy/4MUP/9ojK/EmiH/Vw.jpg\",\"https://inventory.dealersocket.com/api/photo/-865U6G1/1600x0/1761674817/u/ecl/ryxI/CQmn/Y2MC/wkdr/ypik/mA.jpg\",\"https://inventory.dealersocket.com/api/photo/QjXeLMvY/1600x0/1761674820/u/ecl/Y6xv/ccRO/rSDs/kwHR/2FtO/mQ.jpg\",\"https://inventory.dealersocket.com/api/photo/3O2m-5Do/1600x0/1761674823/u/ecl/7lM1/rvcF/jK3D/2N14/Bu4a/TA.jpg\",\"https://inventory.dealersocket.com/api/photo/AOvktLHN/1600x0/1761674825/u/ecl/7pvs/yFkd/4K62/7n2l/UZmO/tA.jpg\",\"https://inventory.dealersocket.com/api/photo/lvIuyCFJ/1600x0/1761674830/u/ecl/ndO7/5Ygf/8DnK/7nlI/N91I/fg.jpg\",\"https://inventory.dealersocket.com/api/photo/ytzekoDa/1600x0/1761674832/u/ecl/IctD/kPmy/VOpV/uKDQ/jD0q/Hw.jpg\",\"https://inventory.dealersocket.com/api/photo/kwoSXUqD/1600x0/1761674834/u/ecl/LMxW/zzQb/oci3/TlhZ/sO35/2Q.jpg\",\"https://inventory.dealersocket.com/api/photo/d-NVse5Y/1600x0/1761674837/u/ecl/hw8P/aEKl/sr8t/Mu4r/vhGE/5w.jpg\",\"https://inventory.dealersocket.com/api/photo/cvgkvEB6/1600x0/1761674841/u/ecl/UWX5/pYaX/1uQZ/hSCe/McdF/3g.jpg\",\"https://inventory.dealersocket.com/api/photo/qk4UrT7i/1600x0/1761674843/u/ecl/mObs/exj7/4MQb/N1cf/RgU4/mQ.jpg\",\"https://inventory.dealersocket.com/api/photo/5ubJBl-v/1600x0/1761674846/u/ecl/HEap/2YK2/nqCI/GHs9/I56s/gw.jpg\",\"https://inventory.dealersocket.com/api/photo/QzIVG1Jb/1600x0/1761674848/u/ecl/K07R/CUfu/40sq/zSPM/HpM5/Yw.jpg\",\"https://inventory.dealersocket.com/api/photo/xWb9gtEn/1600x0/1761674851/u/ecl/ARQK/5S6H/leCv/aVpD/SyAc/wg.jpg\",\"https://inventory.dealersocket.com/api/photo/xCddTf-A/1600x0/1761674854/u/ecl/gwml/2kGo/We8C/sRd2/eGNt/Yw.jpg\",\"https://inventory.dealersocket.com/api/photo/xAG2-RLT/1600x0/1761674859/u/ecl/KcV7/TRC3/ltQs/XidA/MDNY/5Q.jpg\",\"https://inventory.dealersocket.com/api/photo/TCyKphbn/1600x0/1761674861/u/ecl/0hVj/ttz8/xE3q/2Omc/BkVa/Yg.jpg\",\"https://inventory.dealersocket.com/api/photo/iFD02zlt/1600x0/1761674863/u/ecl/RFYV/r8kt/i8z9/WZYn/Laip/fw.jpg\",\"https://inventory.dealersocket.com/api/photo/IAx9Sr10/1600x0/1761674866/u/ecl/XLQg/yMqC/kNTe/5W28/78HS/5w.jpg\",\"https://inventory.dealersocket.com/api/photo/zn1YtB5z/1600x0/1761674869/u/ecl/IPDF/wsgF/pGT3/zASx/6skx/cg.jpg\",\"https://inventory.dealersocket.com/api/photo/OFQjtx2Q/1600x0/1761674872/u/ecl/JRVB/yPgQ/u2oA/V2O8/pfEu/9g.jpg\",\"https://inventory.dealersocket.com/api/photo/7V-e4GDM/1600x0/1761674875/u/ecl/THqs/C1xI/pMtn/0oUl/1S1Q/ww.jpg\",\"https://inventory.dealersocket.com/api/photo/uWdFrfwK/1600x0/1761674892/u/ecl/ehln/k5EA/0Xc2/2GFk/HJQc/Bg.jpg\",\"https://inventory.dealersocket.com/api/photo/c1Hc4IFD/1600x0/1761674882/u/ecl/kYuT/wmsZ/V4Oa/dpzL/OgDp/Tg.jpg\",\"https://inventory.dealersocket.com/api/photo/NyTW5umV/1600x0/1761674886/u/ecl/1n4A/dNXK/HZrF/6H3O/lanU/rg.jpg\",\"https://inventory.dealersocket.com/api/photo/UdUlSnnE/1600x0/1761674888/u/ecl/aA62/JxO1/98Mh/fP5e/2qcO/6A.jpg\",\"https://inventory.dealersocket.com/api/photo/SlRIeDXH/1600x0/1761674892/u/ecl/n210/amSD/fw0q/TfYE/qlOi/hw.jpg\",\"https://inventory.dealersocket.com/api/photo/AacBoh0Y/1600x0/1761674908/u/ecl/LuyY/Osw8/WnVx/11C5/Mc5g/qg.jpg\",\"https://inventory.dealersocket.com/api/photo/B07qDWZi/1600x0/1761674897/u/ecl/o6lT/khEV/HR9I/tm7v/snzW/kA.jpg\",\"https://inventory.dealersocket.com/api/photo/GR--4kaX/1600x0/1761674900/u/ecl/RY5y/qmiJ/icJT/LEmW/Ni5R/Vw.jpg\",\"https://inventory.dealersocket.com/api/photo/yAGIOipr/1600x0/1761674903/u/ecl/9Nn1/xy5I/s8e0/j9pT/6FJx/Pw.jpg\",\"https://inventory.dealersocket.com/api/photo/bsYjYDQt/1600x0/1761674908/u/ecl/zQMW/VI8p/b3fk/g1RZ/nn0T/dA.jpg\",\"https://inventory.dealersocket.com/api/photo/0GK1R1wx/1600x0/1761674909/u/ecl/4O6a/MXCI/i8Ff/PzKJ/ska6/jQ.jpg\",\"https://inventory.dealersocket.com/api/photo/Q7OV7lvA/1600x0/1761674912/u/ecl/UsIE/cfS2/H5p6/I9Pz/s5Pj/fA.jpg\",\"https://inventory.dealersocket.com/api/photo/23fLhO2c/1600x0/1761674916/u/ecl/q2Wp/uz9C/72kZ/H3ZI/cEUl/Yw.jpg\",\"https://inventory.dealersocket.com/api/photo/-YO8Ht9D/1600x0/1761674919/u/ecl/0js7/v5Y7/zSt4/s0Nn/WP20/0g.jpg\",\"https://inventory.dealersocket.com/api/photo/ugTjBsRG/1600x0/1761674923/u/ecl/MMaq/2J0a/RAqR/ibGI/LPrL/Lw.jpg\",\"https://inventory.dealersocket.com/api/photo/OKXpZJuS/1600x0/1761674939/u/ecl/58Q2/BZLf/2oio/BTPi/mAD4/5A.jpg\",\"https://inventory.dealersocket.com/api/photo/yJ4CjAGn/1600x0/1761674928/u/ecl/gsIw/kHfp/2ekG/rdlV/6RWk/sQ.jpg\",\"https://inventory.dealersocket.com/api/photo/jub1OPvV/1600x0/1761674931/u/ecl/OkzY/FT06/VCdd/COaS/IkTM/UQ.jpg\",\"https://inventory.dealersocket.com/api/photo/raKbYoCZ/1600x0/1761674934/u/ecl/9Ro9/0MvS/ALRT/xvnV/ZWfu/cw.jpg\",\"https://inventory.dealersocket.com/api/photo/WjlfL57m/1600x0/1761674950/u/ecl/pHaC/PZ1x/QLhN/4IjG/2QnC/pg.jpg\",\"https://inventory.dealersocket.com/api/photo/D5txjlb0/1600x0/1761674940/u/ecl/2Rda/eYdd/1HAT/R7b8/t2d2/Kg.jpg\",\"https://inventory.dealersocket.com/api/photo/38y9LrsX/1600x0/1761674943/u/ecl/aXrZ/S5WN/B2dk/1WAm/guXo/nA.jpg\",\"https://inventory.dealersocket.com/api/photo/UPAeBTbd/1600x0/1761674946/u/ecl/TbTK/GE3m/i1jC/1bHc/XVXA/Eg.jpg\",\"https://inventory.dealersocket.com/api/photo/2wCIkxAG/1600x0/1761674949/u/ecl/fl6z/9qFr/shEQ/GDtz/epNQ/Sg.jpg\",\"https://inventory.dealersocket.com/api/photo/EHYexnfE/1600x0/1761674952/u/ecl/wudY/LAtV/K7lm/RM21/T2Kb/AQ.jpg\",\"https://inventory.dealersocket.com/api/photo/fb8sFVlf/1600x0/1761674956/u/ecl/zhHu/zJzv/4WYj/LOlg/nNXL/mQ.jpg\",\"https://inventory.dealersocket.com/api/photo/4uhA2n7c/1600x0/1761674958/u/ecl/dh5D/2KEv/K08p/8OzH/fwUM/gw.jpg\",\"https://inventory.dealersocket.com/api/photo/9IIMy-0C/1600x0/1761674962/u/ecl/lOpl/DaNW/Hjrb/JyYy/r3EG/ug.jpg\"",
        "appraisal": "471804",
        "options_msrp": "104250",
        "price": "519888",
        "post_settings": null,
        "buy_it_now": null,
        "listing_price": null,
        "details_url": "",
        "location": "Austin, TX",
        "has_images": true,
        "descriptions": [
            "1 Key",
            "Clean CarFax",
            "MSRP $689,756",
            "EXTRACAMPIONARIO-NOT STANDARD PAINT: ROSSO F1 2007",
            "Front Radar with ACC $4,843",
            "AFS System America $4,219",
            "Alcantara Intc Central Seats $1,856",
            "Back Radar $2,767",
            "Red Brake Calipers $1,519",
            "Carbon Fibre Side Air Splitter $3,712",
            "Anti Stone Chipping Film $4,893",
            "Carbon Fibre Driver Zone+LEDS $7,593",
            "Carpets Leather/Alcantara V1 $5,906",
            "Coloured Safety Belts $928",
            "Carbon Fibre Dashboard Inserts $6,750",
            "Suspension Lifter $5,737",
            "Horse Stitched on Headrest $1,266",
            "Black Ceramic Exhaust Pipes $1,687",
            "Other Options $73,824"
        ],
        "latest_drop": false,
        "featured": true,
        "vdp_url": "used-2022-ferrari-sf90-spider-rosso-f1-2007---carbon-buckets-boerne-tx-id-ZFF96NMA8N0272648",
        "images": [
            "https://inventory.dealersocket.com/api/photo/n--tGRZA/1600x0/1761674808/u/ecl/fVFo/pCcc/roM8/li54/DPQF/iA.jpg",
            "https://inventory.dealersocket.com/api/photo/2-X7xk06/1600x0/1761674809/u/ecl/WNch/vmJ0/GEW5/yRzS/aJma/4w.jpg",
            "https://inventory.dealersocket.com/api/photo/vlsVC-Eo/1600x0/1761674812/u/ecl/ZOZJ/5IAx/jv27/chZj/50V3/ng.jpg",
            "https://inventory.dealersocket.com/api/photo/P7vr5HN1/1600x0/1761674815/u/ecl/Cvqr/Vfuy/4MUP/9ojK/EmiH/Vw.jpg",
            "https://inventory.dealersocket.com/api/photo/-865U6G1/1600x0/1761674817/u/ecl/ryxI/CQmn/Y2MC/wkdr/ypik/mA.jpg",
            "https://inventory.dealersocket.com/api/photo/QjXeLMvY/1600x0/1761674820/u/ecl/Y6xv/ccRO/rSDs/kwHR/2FtO/mQ.jpg",
            "https://inventory.dealersocket.com/api/photo/3O2m-5Do/1600x0/1761674823/u/ecl/7lM1/rvcF/jK3D/2N14/Bu4a/TA.jpg",
            "https://inventory.dealersocket.com/api/photo/AOvktLHN/1600x0/1761674825/u/ecl/7pvs/yFkd/4K62/7n2l/UZmO/tA.jpg",
            "https://inventory.dealersocket.com/api/photo/lvIuyCFJ/1600x0/1761674830/u/ecl/ndO7/5Ygf/8DnK/7nlI/N91I/fg.jpg",
            "https://inventory.dealersocket.com/api/photo/ytzekoDa/1600x0/1761674832/u/ecl/IctD/kPmy/VOpV/uKDQ/jD0q/Hw.jpg",
            "https://inventory.dealersocket.com/api/photo/kwoSXUqD/1600x0/1761674834/u/ecl/LMxW/zzQb/oci3/TlhZ/sO35/2Q.jpg",
            "https://inventory.dealersocket.com/api/photo/d-NVse5Y/1600x0/1761674837/u/ecl/hw8P/aEKl/sr8t/Mu4r/vhGE/5w.jpg",
            "https://inventory.dealersocket.com/api/photo/cvgkvEB6/1600x0/1761674841/u/ecl/UWX5/pYaX/1uQZ/hSCe/McdF/3g.jpg",
            "https://inventory.dealersocket.com/api/photo/qk4UrT7i/1600x0/1761674843/u/ecl/mObs/exj7/4MQb/N1cf/RgU4/mQ.jpg",
            "https://inventory.dealersocket.com/api/photo/5ubJBl-v/1600x0/1761674846/u/ecl/HEap/2YK2/nqCI/GHs9/I56s/gw.jpg",
            "https://inventory.dealersocket.com/api/photo/QzIVG1Jb/1600x0/1761674848/u/ecl/K07R/CUfu/40sq/zSPM/HpM5/Yw.jpg",
            "https://inventory.dealersocket.com/api/photo/xWb9gtEn/1600x0/1761674851/u/ecl/ARQK/5S6H/leCv/aVpD/SyAc/wg.jpg",
            "https://inventory.dealersocket.com/api/photo/xCddTf-A/1600x0/1761674854/u/ecl/gwml/2kGo/We8C/sRd2/eGNt/Yw.jpg",
            "https://inventory.dealersocket.com/api/photo/xAG2-RLT/1600x0/1761674859/u/ecl/KcV7/TRC3/ltQs/XidA/MDNY/5Q.jpg",
            "https://inventory.dealersocket.com/api/photo/TCyKphbn/1600x0/1761674861/u/ecl/0hVj/ttz8/xE3q/2Omc/BkVa/Yg.jpg",
            "https://inventory.dealersocket.com/api/photo/iFD02zlt/1600x0/1761674863/u/ecl/RFYV/r8kt/i8z9/WZYn/Laip/fw.jpg",
            "https://inventory.dealersocket.com/api/photo/IAx9Sr10/1600x0/1761674866/u/ecl/XLQg/yMqC/kNTe/5W28/78HS/5w.jpg",
            "https://inventory.dealersocket.com/api/photo/zn1YtB5z/1600x0/1761674869/u/ecl/IPDF/wsgF/pGT3/zASx/6skx/cg.jpg",
            "https://inventory.dealersocket.com/api/photo/OFQjtx2Q/1600x0/1761674872/u/ecl/JRVB/yPgQ/u2oA/V2O8/pfEu/9g.jpg",
            "https://inventory.dealersocket.com/api/photo/7V-e4GDM/1600x0/1761674875/u/ecl/THqs/C1xI/pMtn/0oUl/1S1Q/ww.jpg",
            "https://inventory.dealersocket.com/api/photo/uWdFrfwK/1600x0/1761674892/u/ecl/ehln/k5EA/0Xc2/2GFk/HJQc/Bg.jpg",
            "https://inventory.dealersocket.com/api/photo/c1Hc4IFD/1600x0/1761674882/u/ecl/kYuT/wmsZ/V4Oa/dpzL/OgDp/Tg.jpg",
            "https://inventory.dealersocket.com/api/photo/NyTW5umV/1600x0/1761674886/u/ecl/1n4A/dNXK/HZrF/6H3O/lanU/rg.jpg",
            "https://inventory.dealersocket.com/api/photo/UdUlSnnE/1600x0/1761674888/u/ecl/aA62/JxO1/98Mh/fP5e/2qcO/6A.jpg",
            "https://inventory.dealersocket.com/api/photo/SlRIeDXH/1600x0/1761674892/u/ecl/n210/amSD/fw0q/TfYE/qlOi/hw.jpg",
            "https://inventory.dealersocket.com/api/photo/AacBoh0Y/1600x0/1761674908/u/ecl/LuyY/Osw8/WnVx/11C5/Mc5g/qg.jpg",
            "https://inventory.dealersocket.com/api/photo/B07qDWZi/1600x0/1761674897/u/ecl/o6lT/khEV/HR9I/tm7v/snzW/kA.jpg",
            "https://inventory.dealersocket.com/api/photo/GR--4kaX/1600x0/1761674900/u/ecl/RY5y/qmiJ/icJT/LEmW/Ni5R/Vw.jpg",
            "https://inventory.dealersocket.com/api/photo/yAGIOipr/1600x0/1761674903/u/ecl/9Nn1/xy5I/s8e0/j9pT/6FJx/Pw.jpg",
            "https://inventory.dealersocket.com/api/photo/bsYjYDQt/1600x0/1761674908/u/ecl/zQMW/VI8p/b3fk/g1RZ/nn0T/dA.jpg",
            "https://inventory.dealersocket.com/api/photo/0GK1R1wx/1600x0/1761674909/u/ecl/4O6a/MXCI/i8Ff/PzKJ/ska6/jQ.jpg",
            "https://inventory.dealersocket.com/api/photo/Q7OV7lvA/1600x0/1761674912/u/ecl/UsIE/cfS2/H5p6/I9Pz/s5Pj/fA.jpg",
            "https://inventory.dealersocket.com/api/photo/23fLhO2c/1600x0/1761674916/u/ecl/q2Wp/uz9C/72kZ/H3ZI/cEUl/Yw.jpg",
            "https://inventory.dealersocket.com/api/photo/-YO8Ht9D/1600x0/1761674919/u/ecl/0js7/v5Y7/zSt4/s0Nn/WP20/0g.jpg",
            "https://inventory.dealersocket.com/api/photo/ugTjBsRG/1600x0/1761674923/u/ecl/MMaq/2J0a/RAqR/ibGI/LPrL/Lw.jpg",
            "https://inventory.dealersocket.com/api/photo/OKXpZJuS/1600x0/1761674939/u/ecl/58Q2/BZLf/2oio/BTPi/mAD4/5A.jpg",
            "https://inventory.dealersocket.com/api/photo/yJ4CjAGn/1600x0/1761674928/u/ecl/gsIw/kHfp/2ekG/rdlV/6RWk/sQ.jpg",
            "https://inventory.dealersocket.com/api/photo/jub1OPvV/1600x0/1761674931/u/ecl/OkzY/FT06/VCdd/COaS/IkTM/UQ.jpg",
            "https://inventory.dealersocket.com/api/photo/raKbYoCZ/1600x0/1761674934/u/ecl/9Ro9/0MvS/ALRT/xvnV/ZWfu/cw.jpg",
            "https://inventory.dealersocket.com/api/photo/WjlfL57m/1600x0/1761674950/u/ecl/pHaC/PZ1x/QLhN/4IjG/2QnC/pg.jpg",
            "https://inventory.dealersocket.com/api/photo/D5txjlb0/1600x0/1761674940/u/ecl/2Rda/eYdd/1HAT/R7b8/t2d2/Kg.jpg",
            "https://inventory.dealersocket.com/api/photo/38y9LrsX/1600x0/1761674943/u/ecl/aXrZ/S5WN/B2dk/1WAm/guXo/nA.jpg",
            "https://inventory.dealersocket.com/api/photo/UPAeBTbd/1600x0/1761674946/u/ecl/TbTK/GE3m/i1jC/1bHc/XVXA/Eg.jpg",
            "https://inventory.dealersocket.com/api/photo/2wCIkxAG/1600x0/1761674949/u/ecl/fl6z/9qFr/shEQ/GDtz/epNQ/Sg.jpg",
            "https://inventory.dealersocket.com/api/photo/EHYexnfE/1600x0/1761674952/u/ecl/wudY/LAtV/K7lm/RM21/T2Kb/AQ.jpg",
            "https://inventory.dealersocket.com/api/photo/fb8sFVlf/1600x0/1761674956/u/ecl/zhHu/zJzv/4WYj/LOlg/nNXL/mQ.jpg",
            "https://inventory.dealersocket.com/api/photo/4uhA2n7c/1600x0/1761674958/u/ecl/dh5D/2KEv/K08p/8OzH/fwUM/gw.jpg",
            "https://inventory.dealersocket.com/api/photo/9IIMy-0C/1600x0/1761674962/u/ecl/lOpl/DaNW/Hjrb/JyYy/r3EG/ug.jpg"
        ],
        "vdp_hero_image": "https://s3-us-west-2.amazonaws.com/ethosautos/vdp/markmotors/ZFF96NMA8N0272648.gif?new",
        "gallery_images": [
            [
                "https://inventory.dealersocket.com/api/photo/2-X7xk06/1600x0/1761674809/u/ecl/WNch/vmJ0/GEW5/yRzS/aJma/4w.jpg",
                "https://inventory.dealersocket.com/api/photo/NyTW5umV/1600x0/1761674886/u/ecl/1n4A/dNXK/HZrF/6H3O/lanU/rg.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/vlsVC-Eo/1600x0/1761674812/u/ecl/ZOZJ/5IAx/jv27/chZj/50V3/ng.jpg",
                "https://inventory.dealersocket.com/api/photo/UdUlSnnE/1600x0/1761674888/u/ecl/aA62/JxO1/98Mh/fP5e/2qcO/6A.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/P7vr5HN1/1600x0/1761674815/u/ecl/Cvqr/Vfuy/4MUP/9ojK/EmiH/Vw.jpg",
                "https://inventory.dealersocket.com/api/photo/SlRIeDXH/1600x0/1761674892/u/ecl/n210/amSD/fw0q/TfYE/qlOi/hw.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/-865U6G1/1600x0/1761674817/u/ecl/ryxI/CQmn/Y2MC/wkdr/ypik/mA.jpg",
                "https://inventory.dealersocket.com/api/photo/AacBoh0Y/1600x0/1761674908/u/ecl/LuyY/Osw8/WnVx/11C5/Mc5g/qg.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/QjXeLMvY/1600x0/1761674820/u/ecl/Y6xv/ccRO/rSDs/kwHR/2FtO/mQ.jpg",
                "https://inventory.dealersocket.com/api/photo/B07qDWZi/1600x0/1761674897/u/ecl/o6lT/khEV/HR9I/tm7v/snzW/kA.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/3O2m-5Do/1600x0/1761674823/u/ecl/7lM1/rvcF/jK3D/2N14/Bu4a/TA.jpg",
                "https://inventory.dealersocket.com/api/photo/GR--4kaX/1600x0/1761674900/u/ecl/RY5y/qmiJ/icJT/LEmW/Ni5R/Vw.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/AOvktLHN/1600x0/1761674825/u/ecl/7pvs/yFkd/4K62/7n2l/UZmO/tA.jpg",
                "https://inventory.dealersocket.com/api/photo/yAGIOipr/1600x0/1761674903/u/ecl/9Nn1/xy5I/s8e0/j9pT/6FJx/Pw.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/lvIuyCFJ/1600x0/1761674830/u/ecl/ndO7/5Ygf/8DnK/7nlI/N91I/fg.jpg",
                "https://inventory.dealersocket.com/api/photo/bsYjYDQt/1600x0/1761674908/u/ecl/zQMW/VI8p/b3fk/g1RZ/nn0T/dA.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/ytzekoDa/1600x0/1761674832/u/ecl/IctD/kPmy/VOpV/uKDQ/jD0q/Hw.jpg",
                "https://inventory.dealersocket.com/api/photo/0GK1R1wx/1600x0/1761674909/u/ecl/4O6a/MXCI/i8Ff/PzKJ/ska6/jQ.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/kwoSXUqD/1600x0/1761674834/u/ecl/LMxW/zzQb/oci3/TlhZ/sO35/2Q.jpg",
                "https://inventory.dealersocket.com/api/photo/Q7OV7lvA/1600x0/1761674912/u/ecl/UsIE/cfS2/H5p6/I9Pz/s5Pj/fA.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/d-NVse5Y/1600x0/1761674837/u/ecl/hw8P/aEKl/sr8t/Mu4r/vhGE/5w.jpg",
                "https://inventory.dealersocket.com/api/photo/23fLhO2c/1600x0/1761674916/u/ecl/q2Wp/uz9C/72kZ/H3ZI/cEUl/Yw.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/cvgkvEB6/1600x0/1761674841/u/ecl/UWX5/pYaX/1uQZ/hSCe/McdF/3g.jpg",
                "https://inventory.dealersocket.com/api/photo/-YO8Ht9D/1600x0/1761674919/u/ecl/0js7/v5Y7/zSt4/s0Nn/WP20/0g.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/qk4UrT7i/1600x0/1761674843/u/ecl/mObs/exj7/4MQb/N1cf/RgU4/mQ.jpg",
                "https://inventory.dealersocket.com/api/photo/ugTjBsRG/1600x0/1761674923/u/ecl/MMaq/2J0a/RAqR/ibGI/LPrL/Lw.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/5ubJBl-v/1600x0/1761674846/u/ecl/HEap/2YK2/nqCI/GHs9/I56s/gw.jpg",
                "https://inventory.dealersocket.com/api/photo/OKXpZJuS/1600x0/1761674939/u/ecl/58Q2/BZLf/2oio/BTPi/mAD4/5A.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/QzIVG1Jb/1600x0/1761674848/u/ecl/K07R/CUfu/40sq/zSPM/HpM5/Yw.jpg",
                "https://inventory.dealersocket.com/api/photo/yJ4CjAGn/1600x0/1761674928/u/ecl/gsIw/kHfp/2ekG/rdlV/6RWk/sQ.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/xWb9gtEn/1600x0/1761674851/u/ecl/ARQK/5S6H/leCv/aVpD/SyAc/wg.jpg",
                "https://inventory.dealersocket.com/api/photo/jub1OPvV/1600x0/1761674931/u/ecl/OkzY/FT06/VCdd/COaS/IkTM/UQ.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/xCddTf-A/1600x0/1761674854/u/ecl/gwml/2kGo/We8C/sRd2/eGNt/Yw.jpg",
                "https://inventory.dealersocket.com/api/photo/raKbYoCZ/1600x0/1761674934/u/ecl/9Ro9/0MvS/ALRT/xvnV/ZWfu/cw.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/xAG2-RLT/1600x0/1761674859/u/ecl/KcV7/TRC3/ltQs/XidA/MDNY/5Q.jpg",
                "https://inventory.dealersocket.com/api/photo/WjlfL57m/1600x0/1761674950/u/ecl/pHaC/PZ1x/QLhN/4IjG/2QnC/pg.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/TCyKphbn/1600x0/1761674861/u/ecl/0hVj/ttz8/xE3q/2Omc/BkVa/Yg.jpg",
                "https://inventory.dealersocket.com/api/photo/D5txjlb0/1600x0/1761674940/u/ecl/2Rda/eYdd/1HAT/R7b8/t2d2/Kg.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/iFD02zlt/1600x0/1761674863/u/ecl/RFYV/r8kt/i8z9/WZYn/Laip/fw.jpg",
                "https://inventory.dealersocket.com/api/photo/38y9LrsX/1600x0/1761674943/u/ecl/aXrZ/S5WN/B2dk/1WAm/guXo/nA.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/IAx9Sr10/1600x0/1761674866/u/ecl/XLQg/yMqC/kNTe/5W28/78HS/5w.jpg",
                "https://inventory.dealersocket.com/api/photo/UPAeBTbd/1600x0/1761674946/u/ecl/TbTK/GE3m/i1jC/1bHc/XVXA/Eg.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/zn1YtB5z/1600x0/1761674869/u/ecl/IPDF/wsgF/pGT3/zASx/6skx/cg.jpg",
                "https://inventory.dealersocket.com/api/photo/2wCIkxAG/1600x0/1761674949/u/ecl/fl6z/9qFr/shEQ/GDtz/epNQ/Sg.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/OFQjtx2Q/1600x0/1761674872/u/ecl/JRVB/yPgQ/u2oA/V2O8/pfEu/9g.jpg",
                "https://inventory.dealersocket.com/api/photo/EHYexnfE/1600x0/1761674952/u/ecl/wudY/LAtV/K7lm/RM21/T2Kb/AQ.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/7V-e4GDM/1600x0/1761674875/u/ecl/THqs/C1xI/pMtn/0oUl/1S1Q/ww.jpg",
                "https://inventory.dealersocket.com/api/photo/fb8sFVlf/1600x0/1761674956/u/ecl/zhHu/zJzv/4WYj/LOlg/nNXL/mQ.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/uWdFrfwK/1600x0/1761674892/u/ecl/ehln/k5EA/0Xc2/2GFk/HJQc/Bg.jpg",
                "https://inventory.dealersocket.com/api/photo/4uhA2n7c/1600x0/1761674958/u/ecl/dh5D/2KEv/K08p/8OzH/fwUM/gw.jpg"
            ],
            [
                "https://inventory.dealersocket.com/api/photo/c1Hc4IFD/1600x0/1761674882/u/ecl/kYuT/wmsZ/V4Oa/dpzL/OgDp/Tg.jpg",
                "https://inventory.dealersocket.com/api/photo/9IIMy-0C/1600x0/1761674962/u/ecl/lOpl/DaNW/Hjrb/JyYy/r3EG/ug.jpg"
            ]
        ]
    }
    const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    const [vehicleVIN, setVehicleVIN] = useState("");
    const { getVehicleData, vehiclesByVIN, vehicleVINsbyID, numberFormatter, priceFormatter, submitContactForm } = useContext(VehicleContext);

    const router = useRouter();
    // console.log("location", location)
    // console.log("vehiclesByVIN", vehiclesByVIN)
    // console.log("vehicleVIN", vehicleVIN)
    //console.log("vehicleVINsbyID", vehicleVINsbyID)
    // useEffect(() => {
    //     if (location && !vehicleVIN && vehiclesByVIN) {
    //         let vin = location.pathname.slice(location.pathname.lastIndexOf("-") + 1, location.pathname.length);
    //         if (vin in vehiclesByVIN) setVehicleVIN(vin);
    //         else if (vin in vehicleVINsbyID) {
    //             console.log("found vehicle ID", vin, vehicleVINsbyID[vin], vehicleVINsbyID);
    //             setVehicleVIN(vehicleVINsbyID[vin]);
    //         } else navigate("/cars-for-sale-boerne-tx");
    //     }
    // }, [location, vehiclesByVIN]);

    /*const defaultVehicleData = {
        exterior_color: "Gray",
        interior_color: "Rosso Ferrari",
        mileage: 2201,
        options_msrp: "42135",
        post_settings: null,
        price: "329000",
        stockno: "1017",
        tol: 23,
        year: 2021,
        make: "Ferrari",
        model: "812 GTS",
        trim: "Base",
        vdp_hero_image: getImages('new/hero-img.webp'),
        vehicle_name: "2018 Ferrari 488 Spider",
        description: `This one of a kind machine  clocks 0 - 60 in 4.5 seconds only one previous owner and only 600 have ever been made.  Its the perfect perfect piece for any collector lorem ipsum dolor sit amet, adipiscing elit, duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. sed dompor aliqua…  <a href="#">Read more</a>`,
        vin: "ZFF97CMA4M0261467",
        body_style: "2D Convertible",
        images: [getImages('new/vdp-thumb1.webp'), getImages('new/vdp-thumb2.webp'), getImages('new/vdp-thumb3.webp'), getImages('new/vdp-thumb4.webp'), getImages('new/vdp-thumb5.webp'), getImages('new/vdp-thumb6.webp')],
        gallery_images: [[getImages('new/vdp-thumb1.webp'), getImages('new/vdp-thumb2.webp')], [getImages('new/vdp-thumb3.webp'), getImages('new/vdp-thumb4.webp')], [getImages('new/vdp-thumb5.webp'), getImages('new/vdp-thumb6.webp')]]
    
    };*/

    // const [vehicleData, setVehicleData] = useState({});
    // console.log("vehicleData", vehicleData)
    const [vehicleExist, setVehicleExist] = useState(false);

    useEffect(() => {
        getVehicleData();
    }, [])

    useEffect(() => {
        if (vehicleVIN && vehiclesByVIN && vehicleVIN in vehiclesByVIN) {
            var vehicle_data = vehiclesByVIN[vehicleVIN];
            // console.log(vehicle_data);
            const split_index = Math.ceil((vehicle_data.images.length - 1) / 2);

            if (split_index > 0) {
                //var gallery_images = vehicle_data.images.slice(1).reduce(function (rows, key, index) {
                //    return (index % 2 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
                //}, []);
                // console.log(vehicle_data.images.length - 1, split_index);
                var gallery_images = vehicle_data.images.slice(1).reduce(function (rows, key, index) {
                    return (index < split_index || vehicle_data.images.length - 1 <= 3 ? rows.push([key]) : rows[index - split_index].push(key)) && rows;
                }, []);
                vehicle_data.gallery_images = gallery_images;
            } else
                vehicle_data.gallery_images = vehicle_data.images.slice(1);
            // console.log(vehicle_data);
            // setVehicleData(vehicle_data);
            setVehicleExist(true);
        }
    }, [vehicleVIN, vehiclesByVIN]);

    var srpCarSlider = {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        dots: true,
    };
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const handleCopy = () => {
        const textArea = document.createElement('textarea');
        textArea.value = vehicleData.vin;
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showTooltip();
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
        document.body.removeChild(textArea);
    };
    const showTooltip = () => {
        setTooltipVisible(true);
        setTimeout(() => {
            setTooltipVisible(false);
        }, 2000);
    };

    // Mobile view condition
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const [showAll, setShowAll] = useState(false);
    const visibleItems = showAll ? vehicleData?.descriptions : vehicleData?.descriptions?.slice(0, 6);
    const galleryRef = useRef(null);
    const openGallery = () => {
        const flatImages = vehicleData?.gallery_images?.flat();
        const items = flatImages.map((src) => ({ src, type: "image" }));

        NativeFancybox.show(items);
    };
    const sectionRef = useRef(null);
    const scrollToSection = () => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const financeCalculatorRef = useRef(null);
    const scrollToFinanceCalculator = () => {
        financeCalculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const [monthlyPayment, setMonthlyPayment] = useState('--');
    console.log("vehicleData", vehicleData)
    const maxLength = 450;
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => setIsExpanded(!isExpanded);

    const displayText = isExpanded ? text : text.slice(0, maxLength);
    return (
        <>
            <Header />
            <section className='vdp-wrap' style={{ backgroundImage: `url(${getImages('vdp-hero.webp')})` }}></section>
            <section className='vdp-hero-bottom'>
                <div className='container'>
                    <div className='d-lg-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center vdpb-left'>
                            <div>
                                <div className='brand-logo'>
                                    <img src={getImages(`logos/${vehicleData.make}.png`)} />
                                </div>
                            </div>
                            <div>
                                <div className='vdp-title1'>{vehicleData.year} {vehicleData.make}</div>
                                <div className='vdp-title2 mt-1'>{vehicleData.model}</div>
                            </div>
                        </div>
                        <div className='d-flex align-items-center vdpb-right'>
                            <div className='mr-84'>
                                <div className='vdp-label'>Price</div>
                                <div className='vdp-price'>{priceFormatter(vehicleData.price, true)}</div>
                            </div>
                            <div>
                                <button type='button' className='black-btn get-started-btn w-220 lg-btn text-uppercase'>Inquire</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='vdp-gallery-wrap'>
                <div className='container'>
                    <div className='row vdpg-block'>
                        <div className='col-md-6 col-6'>
                            <div className='vdpg-box'>
                                <img src={getImages('vdp-thumb1.webp')} />
                            </div>
                        </div>
                        <div className='col-md-6 col-6'>
                            <div className='vdpg-box'>
                                <img src={getImages('vdp-thumb2.webp')} />
                            </div>
                        </div>
                        <div className='col-md-4 col-6'>
                            <div className='vdpg-box'>
                                <img src={getImages('vdp-thumb3.webp')} />
                            </div>
                        </div>
                        <div className='col-md-4 col-6'>
                            <div className='vdpg-box'>
                                <img src={getImages('vdp-thumb4.webp')} />
                            </div>
                        </div>
                        {isMobile &&(
                            <>
                                <div className='col-md-4 col-6'>
                                    <div className='vdpg-box'>
                                        <img src={getImages('vdp-thumb4.webp')} />
                                    </div>
                                </div>
                                <div className='col-md-4 col-6'>
                                    <div className='vdpg-box'>
                                        <img src={getImages('vdp-thumb4.webp')} />
                                    </div>
                                </div>
                                <div className='col-md-4 col-6'>
                                    <div className='vdpg-box'>
                                        <img src={getImages('vdp-thumb4.webp')} />
                                    </div>
                                </div>
                            </>
                        )}
                        <div className='col-md-4 col-6'>
                            <div className='vdpg-box position-relative'>
                                <img src={getImages('vdp-thumb5.webp')} />
                                <div className='vdpg-count'>+15</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='vdp-content-wrap'>
                <div className='container'>
                    <div className='vdpa-block mt-xl-4 row'>
                        <div className='col-xl-4 order-xl-2 mb-3 mb-xl-0'>
                            <div className='vdpa-box p-4 h-100'>
                                <div className='lg-title text-uppercase fw-400 mb-3 wow fadeInUp' data-wow-delay="0.2s">Vehicle Info</div>
                                <div className='vdpa-table'>
                                    <table className='w-100'>
                                        <tbody>
                                            <tr className='wow fadeInUp' data-wow-delay="0.2s">
                                                <th>Stock</th>
                                                <td>{vehicleData.stockno}</td>
                                            </tr>
                                            <tr className='wow fadeInUp' data-wow-delay="0.2s">
                                                <th>VIN</th>
                                                <td className="text-nowrap">
                                                    <span className='position-relative copy-info'>
                                                        <span className='copy_icon' onClick={handleCopy} style={{ cursor: 'pointer' }}></span>
                                                        {tooltipVisible && <span className='copy-tooltip'>Copied!</span>}
                                                    </span>
                                                    {vehicleData.vin}
                                                </td>
                                            </tr>
                                            <tr className='wow fadeInUp' data-wow-delay="0.2s">
                                                <th>Year</th>
                                                <td>{vehicleData.year}</td>
                                            </tr>
                                            <tr className='wow fadeInUp' data-wow-delay="0.2s">
                                                <th>Make</th>
                                                <td>{vehicleData.make}</td>
                                            </tr>
                                            <tr className='wow fadeInUp' data-wow-delay="0.2s">
                                                <th>Model</th>
                                                <td>{vehicleData.model}</td>
                                            </tr>
                                            <tr className='wow fadeInUp' data-wow-delay="0.2s">
                                                <th>Trim</th>
                                                <td>{vehicleData.trim}</td>
                                            </tr>
                                            <tr className='wow fadeInUp' data-wow-delay="0.2s">
                                                <th>Mileage</th>
                                                <td>{numberFormatter(vehicleData.mileage, false, false)}</td>
                                            </tr>
                                            <tr className='wow fadeInUp' data-wow-delay="0.2s">
                                                <th>Body Style</th>
                                                <td>{vehicleData.body_style}</td>
                                            </tr>
                                            <tr className='wow fadeInUp' data-wow-delay="0.2s">
                                                <th>Exterior Color</th>
                                                <td>{vehicleData.exterior_color}</td>
                                            </tr>
                                            <tr className='wow fadeInUp' data-wow-delay="0.2s">
                                                <th>Interior Color</th>
                                                <td>{vehicleData.interior_color}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='mt-4 mb-2 wow fadeInUp' data-wow-delay="0.2s">
                                    <div className='text-center'>
                                        {/* <a href={'http://www.carfax.com/VehicleHistory/p/Report.cfx?partner=DVW_1&vin=' + vehicleData.vin} target="_blank">
                                            <img src={getImages('logo-square-svg.svg')} alt='carfax' />
                                        </a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-8'>
                            <div className='vdpa-box vdpa-about-box'>
                                <div className='xl-title mb-4 wow fadeInUp text-start text-uppercase font-3em' data-wow-delay="0.6s">About this Vehicle</div>
                                <div className='vdp-text'>
                                    <p>{displayText}
                                        {text.length > maxLength && (
                                            <>
                                                {!isExpanded && '... '}
                                                <span
                                                    onClick={toggleReadMore}
                                                    className='vdp-read-more'
                                                >
                                                    {isExpanded ? ' Read less' : ' Read more'}
                                                </span>
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className='vdpa-box vdpa-question-box'>
                                <div id="gotAQuestion" ref={sectionRef} >
                                    <div className='lg-title mb-90 wow fadeInUp' data-wow-delay="0.6s">Got a question? <a href="#" className='text-theme'>Call</a> or <a href="#" className='text-theme'>Chat</a> live with a sales representative</div>
                                    <Formik
                                        // validationSchema={validationSchema}
                                        initialValues={{
                                            full_name: '',
                                            email: '',
                                            phone: '',
                                            comment: '',
                                            vin: vehicleData.stockno,
                                            year: vehicleData.year,
                                            make: vehicleData.make,
                                            model: vehicleData.model,
                                            trim: vehicleData.trim,
                                            mileage: vehicleData.mileage,
                                            exterior: vehicleData.exterior_color,
                                            location: vehicleData?.location || 'Boerne, TX'
                                        }}
                                        onSubmit={async (values, { resetForm }) => {
                                            // console.log(values);
                                            const data = await submitContactForm(values);
                                            if (data.success) {
                                                resetForm();
                                                router.push("/thank-you");
                                            } else
                                                alert("There was a problem with your submission");
                                        }}
                                    >
                                        {({ values, setFieldValue, field, form }) => (
                                            <Form className="custom-form got-question-form" autoComplete="off" name="contact-form">
                                                <Field type="hidden" name="vin" value={values.vin} />
                                                <Field type="hidden" name="year" value={values.year} />
                                                <Field type="hidden" name="make" value={values.make} />
                                                <Field type="hidden" name="model" value={values.model} />
                                                <Field type="hidden" name="trim" value={values.trim} />
                                                <Field type="hidden" name="mileage" value={values.mileage} />
                                                <Field type="hidden" name="exterior" value={values.exterior_color} />
                                                <Field type="hidden" name="location" value={values.location} />
                                                <div className='row'>
                                                    <div className='col-md-6 wow fadeInUp' data-wow-delay="0.2s">
                                                        <div className='form-group'>
                                                            <div className='d-flex align-items-center justify-content-between'>
                                                                <div className='cs-label'>Full Name</div>
                                                                <div className='cs-require'>* Required</div>
                                                            </div>
                                                            <Field
                                                                type="text"
                                                                name="full_name"
                                                                className="form-control"
                                                                required />
                                                            <ValidationError name="full_name" />
                                                        </div>
                                                        <div className='form-group'>
                                                            <div className='d-flex align-items-center justify-content-between'>
                                                                <div className='cs-label'>Email</div>
                                                                <div className='cs-require'>* Required</div>
                                                            </div>
                                                            <Field
                                                                type="text"
                                                                name="email"
                                                                className="form-control"
                                                                required />
                                                            <ValidationError name="email" />
                                                        </div>
                                                        <div className='form-group'>
                                                            <div className='cs-label'>Phone Number</div>
                                                            <Field
                                                                type="text"
                                                                name="phone"
                                                                className="form-control"
                                                                required />
                                                            <ValidationError name="phone" />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 wow fadeInUp' data-wow-delay="0.4s">
                                                        <div className='form-group'>
                                                            <div className='cs-label'>Comments</div>
                                                            <Field
                                                                type="text"
                                                                name="comment"
                                                                className="form-control h-218"
                                                                component="textarea" />
                                                            <ValidationError name="comment" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row mt-3 align-items-center about-action-flex wow fadeInUp' data-wow-delay="0.6s">
                                                    <div className='col-md-6 fb-contact-info'>
                                                        <a href='tel:5127771240' className='d-inline-flex align-items-center phone-no-text'>
                                                            <span className='call-icon me-3'><img src={getImages('local-phone-material.png')} alt='call' /></span>
                                                            <span>(512) 777-1240</span>
                                                        </a>
                                                    </div>
                                                    <div className='col-md-6 text-md-end text-center'>
                                                        <button className='black-btn fw-700 text-uppercase d-inline-block lg-btn'>Send</button>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Vdp
