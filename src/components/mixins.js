export default {
    methods: {
        handleNotifications(channelId, currentChannelId, notifCount, snap) {
            let lastTotal = 0

            const index = notifCount.findIndex(el => el.id === channelId)

            if (index !== -1) {
                if (channelId !== currentChannelId) {
                    lastTotal = notifCount[index].total
                    if (snap.numChildren() - lastTotal > 0) {
                        notifCount[index].notif = snap.numChildren() - lastTotal
                    }
                }
                notifCount[index].lastKnowTotal = snap.numChildren()
            } else {
                notifCount.push({
                    id: channelId,
                    total: snap.numChildren(),
                    lastKnowTotal: snap.numChildren(),
                    notif: 0
                })
            }
        }
    }
}
