import { StyleSheet } from 'react-native';
import { colors } from './colors';

/* =====================================================
   SETTINGS STYLES
===================================================== */

export const settingsStyles =  StyleSheet.create({
    /* ---------- Header ---------- */
    header: {
        paddingVertical: 10,
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
    },
    headerSubtitle: {
        marginTop: 6,
        fontSize: 14,
        opacity: 0.7,
    },
    /* ---------- Profile ---------- */
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        opacity: 0.7,
        marginBottom: 12,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eef2ff',
    },
    avatarText: {
        fontSize: 18,
        fontWeight: '800',
    },
    profileTitle: {
        fontSize: 16,
        fontWeight: '700',
    },
    profileSubtext: {
        marginTop: 2,
        fontSize: 13,
        opacity: 0.7,
    },
    buttonRow: {
        marginTop: 16,
        gap: 10,
    },
    /* ---------- Other ---------- */

})