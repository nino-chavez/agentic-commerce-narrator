# Capability ID Mismatch Fixes

## Summary

**Total Mismatches Found:** 28
**Fixed:** 20
**Remaining (Orphaned):** 8

## Fixed Capability IDs (20)

### Round 1: Clear Suffix Removals (16 fixes)
1. `capability-ai-shopping-assistant-product-discovery` → `capability-ai-shopping-assistant`
2. `capability-assortment-planning-optimization` → `capability-assortment-planning`
3. `capability-attribution-modeling` → `capability-marketing-attribution-modeling`
4. `capability-buy-now-pay-later-bnpl` → `capability-buy-now-pay-later`
5. `capability-clienteling-personal-styling` → `capability-clienteling`
6. `capability-cryptocurrency-digital-wallet-payments` → `capability-cryptocurrency-digital-wallet`
7. `capability-customer-lifetime-value-clv-optimization` → `capability-customer-lifetime-value-optimization`
8. `capability-drive-thru-optimization-voice-ai` → `capability-qsr-drive-thru-optimization`
9. `capability-kitchen-production-management-kds` → `capability-qsr-kitchen-operations`
10. `capability-loyalty-program-management-optimization` → `capability-loyalty-program-management`
11. `capability-next-best-action-nba` → `capability-next-best-action`
12. `capability-price-management-optimization` → `capability-pricing-markdown-management`
13. `capability-proactive-customer-engagement-push-notifications-in-app-messaging` → `capability-proactive-customer-engagement`
14. `capability-sales-operations-planning-s-op` → `capability-sales-operations-planning`
15. `capability-voice-commerce-alexa-google-assistant` → `capability-voice-commerce`
16. `capability-voice-of-customer-voc-intelligence` → `capability-voice-of-customer-intelligence`

### Round 2: Semantic Mapping (4 fixes)
17. `capability-automated-replenishment-center-store` → `capability-allocation-replenishment-optimization`
18. `capability-labor-scheduling-management-qsr-specific` → `capability-store-labor-scheduling`
19. `capability-omnichannel-order-fulfillment-bopis-ship-from-store-curbside` → `capability-order-fulfillment-orchestration`
20. `capability-inventory-distribution-channel-management` → `capability-advanced-inventory-optimization`

## Orphaned Capability IDs (8)

These capability IDs are referenced in agent data but **no corresponding capability files exist**. These represent industry-specific capabilities that may need to be added to the capability library.

### Travel & Hospitality (4)
1. **`capability-crew-scheduling-optimization-airlines-cruise-lines`**
   - Industry: Airlines, Cruise Lines
   - Domain: Operations/HR
   - Status: No matching capability file found

2. **`capability-guest-experience-personalization-crm`**
   - Industry: Hospitality (Hotels, Resorts)
   - Domain: Customer Experience
   - Status: No matching capability file found

3. **`capability-housekeeping-operations-optimization`**
   - Industry: Hospitality (Hotels)
   - Domain: Operations
   - Status: No matching capability file found

4. **`capability-revenue-management-dynamic-pricing-hotels`**
   - Industry: Hospitality (Hotels)
   - Domain: Revenue Management
   - Status: No matching capability file found

### Retail Specific (3)
5. **`capability-fresh-department-management-produce-meat-seafood-bakery-deli`**
   - Industry: Grocery Retail
   - Domain: Merchandising/Operations
   - Status: No matching capability file found

6. **`capability-pharmacy-operations-management`**
   - Industry: Pharmacy/Healthcare Retail
   - Domain: Operations/Compliance
   - Status: No matching capability file found

7. **`capability-visual-merchandising-store-design`**
   - Industry: Retail
   - Domain: Merchandising/Store Operations
   - Status: No matching capability file found

### General Commerce (1)
8. **`capability-revenue-management-dynamic-pricing`**
   - Industry: General Commerce
   - Domain: Pricing/Revenue
   - Status: No matching capability file found
   - Note: Similar to `capability-pricing-markdown-management` but focused on dynamic/algorithmic pricing

## Impact

### Before Fixes
- 28 capability IDs in agent data didn't match capability files
- Agents wouldn't appear for capabilities due to ID mismatch
- Includes the originally discovered `capability-subscription-billing-recurring-payments` issue

### After Fixes
- 20 agent-capability links now working correctly
- Agents will now appear in UI for these 20 capabilities
- 8 orphaned IDs remain (industry-specific capabilities not yet implemented)

## Recommendations

1. **Immediate:** The 20 fixed IDs should resolve most agent visibility issues
2. **Short-term:** Decide whether to:
   - Create capability files for the 8 orphaned IDs
   - Remove orphaned IDs from agent supportingCapabilities arrays
   - Keep orphaned IDs for future capability additions
3. **Long-term:** Implement capability ID validation in data pipeline to prevent future mismatches

## Files Modified

- `data/agents/all-agents.json` - Applied 20 find-and-replace operations

## Date

2025-01-25 (Capability ID audit and bulk fix)
