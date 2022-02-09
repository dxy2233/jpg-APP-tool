const APP1 = 0xffe1,
    Exif = 0x45786966,
    littleMark = 0x4949,
    orientation = 0x0112,
    jpgStart = 0xffd8,
    jpgSOS = 0xffda,
    jpgEnd = 0xffd9

export const sliceAPP1 = (dataView, resetOrientation) => {
    let offset = 2
    let size = 0
    let resOrientation = 1
    while (offset < dataView.byteLength) {
        const marker = dataView.getUint16(offset)
        if (marker === jpgSOS) break
        size = dataView.getUint16(offset + 2) // 读取字段长度直接跳过
        if (marker === APP1) {
            if (resetOrientation && dataView.getUint32(offset + 4) === Exif) {
                // 是否小端字节
                const little = dataView.getUint16(offset + 10) === littleMark
                // 计算第一个IFD偏移量，得出开始的DE的起始位置
                const dStart =
                    offset + 10 + dataView.getUint32(offset + 14, little)
                const length = dataView.getUint16(dStart, little)
                for (let i = 0; i < length; i++) {
                    let targetOffset = dStart + i * 12 + 2
                    if (
                        dataView.getUint16(targetOffset, little) === orientation
                    ) {
                        targetOffset += 8
                        resOrientation = dataView.getUint16(targetOffset, little)
                        dataView.setUint16(targetOffset, 1, little)
                        break
                    }
                }
            }
            return {
                APP1: new Blob([dataView]).slice(offset, offset + 2 + size),
                orientation: resOrientation,
            }
        }
        offset += 2 + size
    }
    return {
        APP1: null,
        orientation: null,
    }
}

export const getAPP1 = async (file, resetOrientation) => {
    // const dataView = new DataView(await file.arrayBuffer())
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = e => {
            const dataView = new DataView(e.target.result)
            if (dataView.getUint16(0) !== jpgStart) resolve(null)
            resolve(sliceAPP1(dataView, resetOrientation).APP1)
        }
    })
}

export const padGetAPP1 = (file) => {
    // const dataView = new DataView(await file.arrayBuffer())
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = e => {
            const dataView = new DataView(e.target.result)
            if (dataView.getUint16(0) !== jpgStart) resolve({
                APP1: null,
                orientation: null,
                newFile: null,
            })
            // 处理jpg缺少编码的问题，补位结尾字节码
            let newFile = null
            if (dataView.getUint16(dataView.byteLength - 2) !== jpgEnd) {
                const endByte = new DataView(new ArrayBuffer(2))
                endByte.setUint16(0, jpgEnd)
                newFile = new Blob([dataView, endByte])
            }
            resolve({
                ...sliceAPP1(dataView, true),
                newFile, 
            })
        }
    })
}